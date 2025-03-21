import React, { useState, useReducer } from "react";
import {
  Box,
  Input,
  Button,
  Typography,
  List,
  ListItem,
  Card,
  Autocomplete,
} from "@mui/joy";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs as Theme } from "react-syntax-highlighter/dist/cjs/styles/prism";

const cannedQuestions = [
  "Which frameworks does this example use?",
  "Does this example use a database?",
  "how does this project handle user inputs?",
  "What is the main function of this project?",
  "How does this project handle errors?",
  "How does this project handle authentication?",
  "How does this project maintain privacy?",
  "Can you find where in the code we are updating the database?",
  "Does this project use hashmaps?",
];

export type MessageType = {
  type: "question" | "answer";
  text: string;
  count?: number;
};

type ChatboxProps = {
  projectName: string;
  projectId: string;
  tenantid: string;
  setLlmResponse: React.Dispatch<React.SetStateAction<any>>;
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
        text: conversationListCopy[lastIndex].text + action.text,
      };
      return {
        ...state,
        messages: conversationListCopy,
      };
    case "done":
      return {
        ...state,
      };
    default:
      return state;
  }
}

const Chatbox: React.FC<ChatboxProps> = ({
  projectName,
  projectId,
  tenantid,
  setLlmResponse,
}) => {
  const [userInput, setUserInput] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [state, dispatch] = useReducer(reducer, { messages: [] });

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

      const resp = await fetch("/api/embed-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          tenant_id: tenantid,
          project_id: projectId,
        }),
      });

      // Reader to process the streamed response
      if (resp.body) {
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let done = false; // we need to read the stream until it's done
        let partialData = ""; // we need to accumulate the data as it comes in in order to update the file selection
        let recievedFiles = false;

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          if (!recievedFiles) {
            partialData += chunkValue;
            const dataParts = partialData.split("EOJSON"); // first part of the response is json, second part is the answer
            if (dataParts.length > 1) {
              const jsonPart = JSON.parse(dataParts[0]);
              setLlmResponse(jsonPart);
              dispatch({ type: "updateAnswer", text: dataParts[1] });
              recievedFiles = true;
              partialData = "";
            }
          } else {
            dispatch({ type: "updateAnswer", text: chunkValue });
            if (done) {
              dispatch({ type: "done", text: "" });
            }
          }
        }
      } else {
        console.log("No response body");
      }
    }
  };

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
        <Typography level="h4" component="h1" mb={2}>
          Ask me about "{projectName}" project
        </Typography>
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
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    ol(props) {
                      const { node, ...rest } = props;
                      return <ol style={{ paddingLeft: "1rem" }} {...rest} />;
                    },
                    code({ node, inline, className, children, ...props }: any) {
                      console.log("Code block:", children, className, props);
                      const match = /language-(\w+)/.exec(className || "");
                      console.log("Match:", match);
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={Theme}
                          PreTag="div"
                          language={match[1]}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
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
          onChange={(event, newValue) => {
            setSelectedInput(newValue || "");
          }}
          onInputChange={(event, newInputValue) => {
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
