import React, { useState, useReducer } from "react";
import { Box, Button, List, ListItem, Card, Autocomplete } from "@mui/joy";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const cannedQuestions = [
  "What are the customer painpoints?",
  "What are the next steps after the conversation?",
  "What did we promise the customer?",
  "Are they using a competitor product?",
];

export type MessageType = {
  type: "question" | "answer";
  text: string;
  count?: number;
};

type ChatboxProps = {
  tenantId: string;
  selectedTranscript: string[];
};

type AppActions = {
  type: string;
  text: string;
};

// TODO: Add "thinking" and "abort" capabilities
interface AppState {
  messages: MessageType[] | [];
}

function reducer(state: AppState, action: AppActions): AppState {
  console.log("got text: " + action.text);
  switch (action.type) {
    case "addQuestion":
      return {
        ...state,
        messages: [
          ...state.messages,
          { type: "question", text: action.text },
          { type: "answer", text: "" },
        ],
      };
    case "updateAnswer":
      const conversationListCopy = [...state.messages];
      const lastIndex = conversationListCopy.length - 1;
      conversationListCopy[lastIndex] = {
        ...conversationListCopy[lastIndex],
        text: action.text,
      };
      return {
        ...state,
        messages: conversationListCopy,
      };
    default:
      return state;
  }
}

// TODO: Add the transcript name, so we'll only chat with one transcript
const Chatbox: React.FC<ChatboxProps> = ({ tenantId, selectedTranscript }) => {
  const [userInput, setUserInput] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [state, dispatch] = useReducer(reducer, { messages: [] });

  const headers: HeadersInit = new Headers();
  headers.set("X-Tenant-Id", tenantId);
  headers.set("Content-Type", "application/json");

  const handleSend = async () => {
    console.log(
      "Got user input:" + userInput + " selected input:" + selectedInput
    );
    const input = selectedInput || userInput;
    console.log("Sending question:", input);
    if (input.trim()) {
      dispatch({ type: "addQuestion", text: input });
      setUserInput("");
      setSelectedInput("");

      const resp = await fetch(`/api/chat`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          conversation_id: selectedTranscript[0],
          question: input,
        }),
      });

      // Reader to process the streamed response
      if (resp.body) {
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let done = false; // we need to read the stream until it's done

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          if (chunkValue) {
            dispatch({ type: "updateAnswer", text: chunkValue });
          }
        }
      } else {
        console.log("No response body");
      } // end handling of response
    } // end hanling of input
  }; // end handleSend method

  return (
    <Box>
      <Card
        sx={{
          padding: 2,
          minHeight: "60vh",
          maxHeight: "60vh",
          overflow: "auto",
        }}
      >
        {/* <Typography level="h4" component="h1" mb={2}>
          Ask me about "{projectName}" project
        </Typography> */}
        <List>
          {state.messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  msg.type === "question" ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  maxWidth: "75%",
                  pt: 1,
                  pb: 1,
                  pl: 2,
                  pr: 2,
                  borderRadius: 20,
                  backgroundColor:
                    msg.type === "question" ? "primary.500" : "neutral.200",
                  color: msg.type === "question" ? "white" : "black",
                }}
              >
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw as any]}
                  components={{
                    ol(props) {
                      const { node, ...rest } = props;
                      return <ol style={{ paddingLeft: "1rem" }} {...rest} />;
                    },
                  }}
                >
                  {msg.text}
                </Markdown>
              </Box>
            </ListItem>
          ))}
        </List>
      </Card>
      <Box sx={{ display: "flex", mt: 2, alignItems: "flex-end" }}>
        <Autocomplete
          freeSolo
          options={cannedQuestions}
          value={selectedInput}
          onChange={(_, newValue) => {
            setSelectedInput(newValue || "");
          }}
          onInputChange={(_, newInputValue) => {
            setUserInput(newInputValue);
          }}
          placeholder="Type your question or select one..."
          sx={{ mr: 1, width: "100%" }}
        />
        <Button onClick={handleSend} variant="solid">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbox;
