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
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page({
  projects,
  initialFiles,
  initialContent,
  initialSelectedFiles,
}: {
  initialContent: string[];
  initialSelectedFiles: string[];
  initialFiles: string[];
  projects: { id: string; name: string; tenant_name: string }[];
}) {
  const { tenantId } = useParams();
  const [content, setFileContent] = useState<string[]>(initialContent);
  const [selectedFile, setSelectedFile] =
    useState<string[]>(initialSelectedFiles);
  const [files, setFiles] = useState<string[]>(initialFiles);
  const [selectedProject, setSelectedProject] = useState<string | null>(
    projects[0].id
  );
  const [llmResponse, setLlmResponse] = useState<LlmResponseData | undefined>(
    undefined
  );

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
            tenant_id: tenantId,
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
            tenant_id: tenantId,
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
          tenant_id: tenantId,
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
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-2 items-center">
        <NextLink href="/tenants">
          <Button variant="secondary">Back to tenant selection</Button>
        </NextLink>
        Current tenant:{" "}
        {projects.find((proj) => proj.id === selectedProject)?.tenant_name ||
          ""}
      </div>
      <div className="text-lg font-bold">Project:</div>
      <ProjectDropdown
        projects={projects}
        selectedProject={selectedProject || ""}
        onProjectChange={handleProjectChange}
      />
      <div className="flex flex-row">
        <Sidebar
          files={files}
          onFileClick={handleFileClick}
          selectedFiles={selectedFile}
          llmResponse={llmResponse}
        />
        <div className="w-1/2">
          <FileViewer llmResponse={llmResponse} content={content} />
        </div>
        <div className="w-1/2">
          <div className="p-1">
            <Chatbox
              projectName={
                projects.find((proj) => proj.id === selectedProject)?.name || ""
              }
              projectId={selectedProject || ""}
              tenantid={String(tenantId)}
              setLlmResponse={setLlmResponse}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
