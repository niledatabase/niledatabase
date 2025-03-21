// components/ProjectDropdown.tsx
import React from "react";
import { Select, Option } from "@mui/joy";

interface ProjectDropdownProps {
  projects: { id: string; name: string }[];
  selectedProject: string;
  onProjectChange: (projectId: string) => void;
}

const ProjectDropdown: React.FC<ProjectDropdownProps> = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  return (
    <Select
      value={selectedProject}
      onChange={(event, newValue) => onProjectChange(newValue as string)}
    >
      {projects.map((project) => (
        <Option key={project.id} value={project.id}>
          {project.name}
        </Option>
      ))}
    </Select>
  );
};

export default ProjectDropdown;
