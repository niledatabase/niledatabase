"use client";

import { useState, useEffect, use } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import FileViewer from '@/components/FileViewer';
import Sidebar from '@/components/Sidebar';
import LlmResponseData from '@/lib/llmResponse';

export default function Page({
    params,
  }: {
    params: { tenantid: string };
  }) {
    const [data, setData] = useState<LlmResponseData>();
    const [content, setFileContent] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string[]>([]);
    const [files, setFiles] = useState<string[]>([]);

    useEffect(() => {
        const fetchReadme = async () => {
            console.log("getting readme")
            try {
                const response = await fetch(`/api/file-content`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tenant_id: params.tenantid, file_name: 'README.md' }),
                });
                const resp = await response.json();
                setFileContent([resp.content]);
                setSelectedFile(['README.md']);
            }
            catch (error) {
                console.error('Error fetching file content:', error);
            }
        };
        fetchReadme();
    }, []);

    useEffect(() => {
        const fetchFiles = async () => {
            console.log("getting files")
          try {
            const response = await fetch('/api/files', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tenant_id: params.tenantid }),
                
            });
            const resp = await response.json();
            setFiles(resp.files);
          } catch (error) {
            console.error('Error fetching files:', error);
          }
        };

        fetchFiles();
      }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //@ts-expect-error
        const question = e.currentTarget[0].value;
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
                    setFileContent(data.content);
                    setSelectedFile(data.files);
                });
            } else {
                console.error('Failed to fetch data');
            }
        });
    };
    
    const handleFileClick = async (file: string) => {
        setSelectedFile([file]);
    
        try {
          const response = await fetch(`/api/file-content`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tenant_id: params.tenantid, file_name: file }),
          });
          const resp = await response.json();
          setFileContent([resp.content]);
        } catch (error) {
          console.error('Error fetching file content:', error);
          setFileContent([]);
        }
      };

    return (
        <Box sx={{ padding: 4, width: '100%' }}>
            <Grid container spacing={2} sx={{ height: '70vh' }}>
            <Grid md={3} sx={{overflow: 'auto', height:'65vh'}}>
                <Sidebar files={files} onFileClick={handleFileClick} selectedFiles={selectedFile}/>
            </Grid>
            <Grid  xs={12} md={4}>
                <FileViewer data={data} content={content} />
            </Grid>
                <Grid xs={12} md={4}>
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
                        />
                    </Box>
        </Box>
    );
}
