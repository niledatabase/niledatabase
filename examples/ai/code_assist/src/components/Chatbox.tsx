import React, { useState, useReducer } from 'react';
import { Box, Input, Button, Typography, List, ListItem, Card, CardActions } from '@mui/joy';

export type MessageType = {
  type: 'question' | 'answer';
  text: string;
  count?: number;
};

type ChatboxProps = {
    projectName: string;
    projectId: string;
    tenantid: string;
    setLlmResponse: React.Dispatch<React.SetStateAction<any>>;
  };

type AppActions = {
    type: string;
    text: string;
}
  
// TODO: Add "thinking" and "abort" capabilities
interface AppState {
    messages: MessageType[] | [];
  }


  function reducer(state: AppState, action: AppActions): AppState {
    switch (action.type) {
      case "addQuestion":
        return {
            ...state,
            messages:
            [
                ...state.messages,
                { type: "question", text: action.text },
                { type: "answer", text: "" },
            ]};
      case "updateAnswer":
        const conversationListCopy = [...state.messages];
        const lastIndex = conversationListCopy.length - 1;
        conversationListCopy[lastIndex] = {
          ...conversationListCopy[lastIndex],
          text: conversationListCopy[lastIndex].text + action.text,
        };
        return {
            ...state,
            messages:conversationListCopy
        };
      case "done":
        return {
          ...state
        };
      default:
        return state;
    }
  }

const Chatbox: React.FC<ChatboxProps> = ({ projectName, projectId, tenantid, setLlmResponse }) => {
  const [input, setInput] = useState('');
  const [state, dispatch] = useReducer(reducer, {messages: []});

  const handleSend = async () => {
    if (input.trim()) {
     //@ts-ignore - dispatch accepts an action, even if TypeScript doesn't realize it
      dispatch({ type: 'addQuestion', text: input});
      setInput('');

      const resp = await fetch('/api/embed-query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            question: input,
            tenant_id: tenantid, 
            project_id: projectId,
        }) });

        // Reader to process the streamed response
        if (resp.body) {
            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let done = false; // we need to read the stream until it's done

            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                //@ts-ignore - dispatch accepts an action, even if TypeScript doesn't realize it
                dispatch({ type: 'updateAnswer', text: chunkValue});
                if (done) {
                    //@ts-ignore - dispatch accepts an action, even if TypeScript doesn't realize it
                    dispatch({ type: "done" });
                }
            }
                
           /* reader.read().then(function processStream({ done, value }) {
                if (done) {
                  console.log('Stream complete');
                  return;
                }
            partialData += decoder.decode(value);*/
        } else {
            console.log('No response body');
        }

     //const data = await resp.json();


       //setLlmResponse(data);
    }
  };

  return (
    <Box>
    <Card sx={{padding: 2, minHeight:'60vh',maxHeight:'60vh', overflow:'auto'}}>
      <Typography level="h4" component="h1" mb={2}>Ask me about {projectName}</Typography>
      <List>
        {state.messages.map((msg, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.type === 'question' ? 'flex-end' : 'flex-start' }}>
            <Box
              sx={{
                maxWidth: '75%',
                pt: 1,
                pb: 1,
                pl: 2,
                pr: 2,
                borderRadius: 20,
                backgroundColor: msg.type === 'question' ? 'primary.500' : 'neutral.200',
                color: msg.type === 'question' ? 'white' : 'black',
              }}
            >
              {msg.text}
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
    <Box sx={{ display: 'flex', mt: 2, alignItems: 'flex-end' }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            fullWidth
            sx={{ mr: 1 }}
          />
          <Button onClick={handleSend} variant="solid">Send</Button>
    </Box></Box>
  );
};

export default Chatbox;