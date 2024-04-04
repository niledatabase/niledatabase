"use client";

import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { useTheme } from "next-themes";
import { ElementRef, FC, useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import UserMessage from "./user-message";
import AIMessage from "./ai-message";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { MemoizedReactMarkdown } from "./markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import PdfRenderer from "@/components/pdf-renderer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  isUserMessage: boolean;
  createdAt: Date;
  updatedAt: Date;
  user_id: string | null;
  fileId: string | null;
  tenant_id: string;
};

interface ChatProps {
  fileId: string;
  pastMessages: Message[];
  userId: string;
  tenant_id: string;
  url: string;
}

export const Chat: FC<ChatProps> = ({
  fileId,
  tenant_id,
  pastMessages,
  userId,
  url,
}) => {
  const router = useRouter();
  const {
    input,
    handleInputChange,
    handleSubmit,
    data,
    isLoading,
    setInput,
    append,
    messages,
  } = useChat({
    body: {
      fileId: fileId,
      user_id: userId,
      tenant_id: tenant_id,
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error("Error Processing Request");
      }
    },
  });
  const { theme } = useTheme();
  const scrollRef = useRef<ElementRef<"div">>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = (content: string) => {
    if (isCopied) return;
    copyToClipboard(content);
    toast.success("Message Copied to Clipboard");
  };
  console.log(pastMessages);
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel className="w-[50vw] max-h-[85vh]">
          <PdfRenderer url={url} />{" "}
        </ResizablePanel>
        <ResizableHandle className="mx-5" withHandle />
        <ResizablePanel className="overflow-x-hidden last:mb-12">
          <ScrollArea className="h-[77vh] overflow-x-hidden overflow-auto w-full">
            <ScrollBar orientation="vertical" forceMount />
            {pastMessages.length > 0 ? (
              <>
                {pastMessages.map((message, index) => (
                  <ScrollArea key={index} className="max-h-screen">
                    {message.isUserMessage ? (
                      <UserMessage text={message.text} />
                    ) : (
                      <AIMessage text={message.text} />
                    )}
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                ))}
              </>
            ) : (
              ""
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("whitespace-pre-wrap group", {
                  "text-blue-500 text-right p-4  gap-x-8 rounded-lg max-w-lg ":
                    m.role === "user",
                  "text-green-500 p-4 w-full flex items-start gap-x-8 rounded-lg max-w-lg bg-muted":
                    m.role !== "user",
                  "prose-p:text-indigo-400 prose-li:text-indigo-400":
                    m.role === "user",
                })}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  className="text-base prose dark:prose-invert prose-ul:m-0 prose-li:m-0 prose-p:my-0 prose-h3:my-0"
                >
                  {m.content}
                </ReactMarkdown>
                <Button
                  onClick={() => onCopy(m.content)}
                  className="hidden group-hover:block"
                  size="icon"
                  variant="ghost"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {/* <div className="bg-white">Some</div> */}
            <form onSubmit={handleSubmit}>
              {isLoading && (
                <div className="p-4 rounded-lg w-1/2 flex items-center justify-center bg-muted mt-10">
                  <BeatLoader
                    color={theme === "light" ? "black" : "white"}
                    size={5}
                  />
                </div>
              )}
              <div ref={scrollRef} />
              <Input
                className="fixed bottom-0 w-[80vw] md:w-full max-w-md p-2 mb-8 min-h-4 border border-gray-300 rounded shadow-xl"
                value={input}
                placeholder="Talk to the document..."
                onChange={handleInputChange}
              />
            </form>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <div className="flex flex-col w-full max-w-xl pb-24 mx-auto stretch min-h-screen"></div> */}
    </>
  );
};
