"use client";

import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import FileViewer from "@/components/FileViewer";
import FormLabel from "@mui/joy/FormLabel";
import Sidebar from "@/components/Sidebar";
import LlmResponseData from "@/lib/llmResponse";
import ProjectDropdown from "@/components/ProjectDropdown";
import Chatbox from "@/components/Chatbox";
import NextLink from "next/link";
import MUILink from "@mui/joy/Link";
import { Typography } from "@mui/joy";

export default function Page({ params }: { params: { tenantid: string } }) {
  const [content, setFileContent] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [projects, setProjects] = useState<
    { id: string; name: string; tenant_name: string }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [llmResponse, setLlmResponse] = useState<LlmResponseData | undefined>(
    undefined
  );

  // Loading projects for project dropdown, only happens on page load
  // Note that for useEffect, the order matters. We need to fetch projects first to get the selected project.
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tenant_id: params.tenantid }),
        });
        const data = await response.json();
        setProjects(data.projects);

        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0].id);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Loading README.md content for selected project, only happens when selected
  useEffect(() => {
    const fetchReadme = async () => {
      console.log("getting readme");
      if (!selectedProject) return;
      try {
        const response = await fetch(`/api/file-content`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tenant_id: params.tenantid,
            file_name: "README.md",
            project_id: selectedProject,
          }),
        });
        const resp = await response.json();
        setFileContent([resp.content]);
        setSelectedFile(["README.md"]);
      } catch (error) {
        console.error("Error fetching file content:", error);
      }
    };
    fetchReadme();
  }, [selectedProject]);

  // Loading files for selected project, only happens when selected
  useEffect(() => {
    const fetchFiles = async () => {
      if (!selectedProject) return;
      console.log("getting files");
      try {
        const response = await fetch("/api/files", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tenant_id: params.tenantid,
            project_id: selectedProject,
          }),
        });
        const resp = await response.json();
        setFiles(resp.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [selectedProject]); // note that we need to add selectedProject as a dependency so that the files will reload when project changes

  // when a project is selected, we need to fetch the README.md content and the files for that project
  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedFile([]);
    setFileContent([""]);
  };

  // when a file is clicked, we need to fetch the content of that file and show that it is selected
  // This overrides any question response that is being displayed
  const handleFileClick = async (file: string) => {
    try {
      const response = await fetch(`/api/file-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenant_id: params.tenantid,
          file_name: file,
          project_id: selectedProject,
        }),
      });
      const resp = await response.json();
      setLlmResponse(undefined); // we need to clear the response when a file is clicked so we can show the file content instead
      setFileContent([resp.content]);
      setSelectedFile([file]);
    } catch (error) {
      console.error("Error fetching file content:", error);
      setFileContent([]);
    }
  };

  return (
    <Box sx={{ padding: 4, width: "100%" }}>
      <Grid container spacing={2} sx={{ height: "70vh" }}>
        <Grid xs={12}>
          <FormLabel>Project:</FormLabel>
          <ProjectDropdown
            projects={projects}
            selectedProject={selectedProject || ""}
            onProjectChange={handleProjectChange}
          />
        </Grid>
        <Grid xs={2}>
          <Typography level="body-md">
            {" "}
            Current tenant:{" "}
            {projects.find((proj) => proj.id === selectedProject)
              ?.tenant_name || ""}
          </Typography>
        </Grid>
        <Grid xs={10}>
          <MUILink href="/tenants" component={NextLink}>
            (Back to tenant selection){" "}
          </MUILink>
        </Grid>
        <Grid md={2} sx={{ overflow: "auto", height: "65vh" }}>
          <Sidebar
            files={files}
            onFileClick={handleFileClick}
            selectedFiles={selectedFile}
            llmResponse={llmResponse}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <FileViewer llmResponse={llmResponse} content={content} />
        </Grid>
        <Grid xs={12} md={6}>
          <Chatbox
            projectName={
              projects.find((proj) => proj.id === selectedProject)?.name || ""
            }
            projectId={selectedProject || ""}
            tenantid={params.tenantid}
            setLlmResponse={setLlmResponse}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
