// components/FileViewer.tsx
import React from "react";
import { Box } from "@mui/joy";
import Typography from "@mui/joy/Typography";

interface ContentViewerProps {
  content: string[] | undefined;
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
      key={Date.now()} // This is a hack to force re-rendering of the Highlight component
    >
      {/* TODO: Nicer formatting of the sales transcript */}
      {content === undefined ? (
        <Typography level="body-lg">
          Please select a call transcript
        </Typography>
      ) : (
          <Box height="60vh">
            {
              content.join("\n")
            }
          </Box>
      )}
    </Box>
  );
};

export default ContentViewer