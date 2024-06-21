// components/FileViewer.tsx
import React from 'react';
import { Box } from '@mui/joy';
import Highlight from 'react-highlight';
import Typography from '@mui/joy/Typography';
import LlmResponseData from '../lib/llmResponse'


interface FileViewerProps {
  data: LlmResponseData | undefined;
  content: string[];
}

const FileViewer: React.FC<FileViewerProps> = ({data, content}) => {
  return (
                    <Box
                        sx={{
                            height: '65vh',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            padding: 2,
                            overflow: 'auto',
                            
                        }}
                        key={Date.now()} // This is a hack to force re-rendering of the Highlight component
                    >
                        {data === undefined && content == undefined?  
                            <Typography level="body-lg">
                                Code used to answer question will show up here when you ask a question.
                            </Typography>
                            :
                            <Highlight >
                                <Box height='60vh'>
                                { data === undefined ? content.map((line: string) => line + "\n") :
                                data.files.map((fileName: string, index: number) => (
                                    content[index] === undefined ? "" :
                                    "//" + fileName + "\n" + content[index] + "\n"
                                ))}
                                 </Box>
                            </Highlight>
                        }
                    </Box>
  );
};

export default FileViewer;
