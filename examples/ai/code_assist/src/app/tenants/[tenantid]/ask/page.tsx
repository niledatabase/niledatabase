"use client";

import { useState, useEffect, use } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import FileViewer from '@/components/FileViewer';
import FormLabel from '@mui/joy/FormLabel';
import Sidebar from '@/components/Sidebar';
import LlmResponseData from '@/lib/llmResponse';
import ProjectDropdown from '@/components/ProjectDropdown';
import Chatbox from '@/components/Chatbox';

export default function Page({
    params,
  }: {
    params: { tenantid: string };
  }) {
    const [data, setData] = useState<LlmResponseData>(); // Todo: break this down into multiple states
    const [content, setFileContent] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string[]>([]);
    const [files, setFiles] = useState<string[]>([]);
    const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    // Note that for useEffect, the order matters. We need to fetch projects first to get the selected project.
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tenant_id: params.tenantid }),
                
            });
            const data = await response.json();
            setProjects(data.projects);
    
            if (data.projects.length > 0) {
              setSelectedProject(data.projects[0].id);
            }
          } catch (error) {
            console.error('Error fetching projects:', error);
          }
        };
    
        fetchProjects();
      }, []);

    useEffect(() => {
        const fetchReadme = async () => {
            console.log("getting readme")
            if (!selectedProject) return;
            try {
                const response = await fetch(`/api/file-content`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tenant_id: params.tenantid, file_name: 'README.md', project_id: selectedProject}),
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
    }, [selectedProject]);

    useEffect(() => {
        const fetchFiles = async () => {
            if (!selectedProject) return;
            console.log("getting files")
            try {
                const response = await fetch('/api/files', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tenant_id: params.tenantid, project_id: selectedProject}),
                    
                });
                const resp = await response.json();
                setFiles(resp.files);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
      }, [selectedProject]); // note that we need to add selectedProject as a dependency so that the files will reload when project changes

      const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setSelectedFile([]);
        setFileContent(['']);
      };

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
                project_id: selectedProject,
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
            body: JSON.stringify({ tenant_id: params.tenantid, file_name: file , project_id: selectedProject}),
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
            <Grid xs={12}>
            <FormLabel>Project:</FormLabel>
                <ProjectDropdown
                projects={projects}
                selectedProject={selectedProject || ''}
                onProjectChange={handleProjectChange}
                />
            </Grid>
            <Grid md={3} sx={{overflow: 'auto', height:'65vh'}}>
                <Sidebar files={files} onFileClick={handleFileClick} selectedFiles={selectedFile}/>
            </Grid>
            <Grid  xs={12} md={5}>
                <FileViewer data={data} content={content} />
            </Grid>
            <Grid xs={12} md={4}>
                <Chatbox projectName={projects.find((proj) => proj.id === selectedProject )?.name || ''} />
            </Grid>
                
            </Grid>
        </Box>
    );
}
