import React, { useState } from 'react';
import { Box, Input, Button, Typography, List, ListItem, Card, CardActions } from '@mui/joy';

type MessageType = {
  type: 'question' | 'answer';
  text: string;
};

type ChatboxProps = {
    projectName: string;
  };

const Chatbox: React.FC<ChatboxProps> = ({ projectName }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { type: 'question', text: input }]);
      setInput('');

      // Simulate an answer (in a real application, you would call an API here)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'answer', text: 'This is a simulated answer.' }
        ]);
      }, 1000);
    }
  };

  return (
    <Box>
    <Card sx={{padding: 2, minHeight:'60vh'}}>
      <Typography level="h4" component="h1" mb={2}>Ask me about {projectName}</Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {messages.map((msg, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: msg.type === 'question' ? 'flex-end' : 'flex-start' }}>
            <Box
              sx={{
                maxWidth: '75%',
                padding: 1,
                borderRadius: 2,
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