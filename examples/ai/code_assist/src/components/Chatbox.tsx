import React, { useState } from 'react';
import { Box, Input, Button, Typography, List, ListItem, Card, CardActions } from '@mui/joy';

export type MessageType = {
  type: 'question' | 'answer';
  text: string;
};

type ChatboxProps = {
    projectName: string;
    projectId: string;
    tenantid: string;
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    setLlmResponse: React.Dispatch<React.SetStateAction<any>>;
  };

const Chatbox: React.FC<ChatboxProps> = ({ projectName, projectId, tenantid, messages, setMessages, setLlmResponse }) => {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'question', text: input }]);
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

        const data = await resp.json();

      setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'answer', text: data.answer },
        ]);
        setLlmResponse(data);
    }
  };

  return (
    <Box>
    <Card sx={{padding: 2, minHeight:'60vh',maxHeight:'60vh', overflow:'auto'}}>
      <Typography level="h4" component="h1" mb={2}>Ask me about {projectName}</Typography>
      <List>
        {messages.map((msg, index) => (
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