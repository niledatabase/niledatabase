// components/FileViewer.tsx
import React from "react";
import { Box } from "@mui/joy";
import Highlight from "react-highlight";
import Typography from "@mui/joy/Typography";
import LlmResponseData from "../lib/llmResponse";

interface FileViewerProps {
  llmResponse: LlmResponseData | undefined;
  content: string[] | undefined;
}

const FileViewer: React.FC<FileViewerProps> = ({ llmResponse, content }) => {
  // if content is undefined, we show a message to ask a question
  // if llmResponse is undefined, we show the content of the file selected by the user
  // if we have an llm response, we show the content of the files used in the response
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
      {content === undefined ? ( // this basically shouldn't happen as we load the README.md by default
        <Typography level="body-lg">
          Code used to answer question will show up here when you ask a
          question.
        </Typography>
      ) : (
        <Highlight>
          <Box height="60vh">
            {
              llmResponse
                ? llmResponse.files.map(
                    (
                      fileName: string,
                      index: number // this happens when we load files as result of a question, llmResponse gets reset when a file is clicked
                    ) =>
                      llmResponse.content[index] === undefined
                        ? ""
                        : "//" +
                          fileName +
                          "\n" +
                          llmResponse.content[index] +
                          "\n"
                  )
                : content.join("\n") // this happens when we load a file by clicking on sidebar
            }
          </Box>
        </Highlight>
      )}
    </Box>
  );
};

export default FileViewer;
