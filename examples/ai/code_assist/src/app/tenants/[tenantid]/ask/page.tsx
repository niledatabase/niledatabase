"use client";

import { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Highlight from 'react-highlight';



export default function Page({
    params,
  }: {
    params: { tenantid: string };
  }) {
    const [question, setQuestion] = useState('');
    const [data, setData] = useState<any>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const response = fetch('/api/embed-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                question: question,
                tenant_id: params.tenantid, 
            }),
        }).then((response) => {
            if (response.ok) {
                const data = response.json().then((data) => {
                    console.log(data);
                    setData(data);
                });
            } else {
                console.error('Failed to fetch data');
            }
        });
    };

    return (
        <Box sx={{ padding: 4, width: '100%' }}>
            <Grid container spacing={2} sx={{ height: '70vh' }}>
                <Grid  xs={12} md={6}>
                    <Box
                        sx={{
                            height: '65vh',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            padding: 2,
                            overflow: 'auto',
                            
                        }}
                    >
                        {data === undefined ?  
                            <Typography level="body-lg">
                                Code used to answer question will show up here when you ask a question.
                            </Typography>
                            :
                            <Highlight>
                                {data.files.map((fileName: string, index: number) => (
                                    <pre>
                                        //{fileName}

                                        {data.content[index]}
                                    </pre>
                                ))}
                                </Highlight>
                        }
                    </Box>
                </Grid>
                <Grid xs={12} md={6}>
                    <Box
                        sx={{
                            height: '65vh',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            padding: 2,
                            overflow: 'auto',
                        }}
                    >
                        {data === undefined ?
                        <Typography level="body-lg">
                            Answer to your question will show up here when you ask a question.
                        </Typography>
                        :
                        <Typography level="body-lg">
                            {data.answer}
                        </Typography>}
                    </Box>
                </Grid>
                
            </Grid>
            <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ marginTop: 2 }}
                    >
                        <Input
                            placeholder='Ask a question. For example: "Which frameworks this project uses?"'
                            sx={{ '--Input-decoratorChildHeight': '45px' }}
                                  endDecorator={
                                    <Button
                                      variant="solid"
                                      color="primary"
                                      type="submit"
                                    >
                                      Ask
                                    </Button>}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </Box>
        </Box>
    );
}
