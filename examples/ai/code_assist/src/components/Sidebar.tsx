import React from "react";
import { basename } from "path";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Tooltip,
} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import Description from "@mui/icons-material/Description";
import LlmResponseData from "@/lib/llmResponse";

interface SidebarProps {
  files: string[];
  onFileClick: (file: string) => void;
  selectedFiles: string[];
  llmResponse: LlmResponseData | undefined;
}

// utils/truncatePaths.ts
export const truncateCommonPath = (paths: string[]): string[] => {
  if (paths.length === 0) return [];

  const findCommonPrefix = (arr: string[]): string => {
    if (!arr.length) return "";

    const sortedArr = arr.concat().sort();
    const first = sortedArr[0];
    const last = sortedArr[sortedArr.length - 1];
    const length = first.length;

    let i = 0;
    while (i < length && first.charAt(i) === last.charAt(i)) i++;

    return first.substring(0, i);
  };

  const commonPrefix = findCommonPrefix(paths);

  return paths.map((path) => path.replace(commonPrefix, ""));
};

const Sidebar: React.FC<SidebarProps> = ({
  files,
  onFileClick,
  selectedFiles,
  llmResponse,
}) => {
  const truncatedFiles = truncateCommonPath(files);
  if (llmResponse) {
    // show files used in the response when a question is asked
    selectedFiles = llmResponse.files;
  }
  return (
    <List>
      {truncatedFiles.map((file, index) => (
        <ListItem key={index}>
          <Tooltip title={files[index]} placement="right">
            <ListItemButton
              onClick={() => onFileClick(files[index])}
              selected={selectedFiles?.includes(files[index])}
            >
              <ListItemDecorator>
                <Description />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="body-md" noWrap>
                  {file}
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
