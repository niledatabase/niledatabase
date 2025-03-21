import React from "react";
import { Box, Typography } from "@mui/joy";
import { TranscriptItem } from "../types/types";

interface ContentViewerProps {
  content: TranscriptItem[] | undefined;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ content }) => {
  return (
    <Box
      sx={{
        height: "65vh",
        border: "1px solid #ccc",
        borderRadius: 1,
        padding: 2,
        overflow: "auto",
      }}
      key={Date.now()}
    >
      {content === undefined ? (
        <Typography level="body-lg">Please select a call transcript</Typography>
      ) : (
        <Box
          component="pre"
          sx={{ whiteSpace: "pre-wrap", fontFamily: "inherit", m: 0 }}
        >
          {content
            .map(
              (item) =>
                `${item.speaker_role.toUpperCase()}: ${item.content}\n\n`
            )
            .join("")}
        </Box>
      )}
    </Box>
  );
};

export default ContentViewer;
