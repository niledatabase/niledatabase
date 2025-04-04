"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseChatHelpers } from "ai/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const exampleMessages = [
  {
    heading: "Summarize document",
    message: `Can you summarize this document?`,
  },
  {
    heading: "Key concepts",
    message: "Can you tell me about the key concepts from this document?",
  },
];

export function EmptyStateAI({ setInput }: Pick<UseChatHelpers, "setInput">) {

  return (
    <>
      <div className="text-2xl font-ranadeRegular"> Welcome! Ask a question related to this document.  </div>
      {isTypingDone && (
        <Card className="p-5 bg-muted font-ranadeLight">
          <div className="flex flex-col items-center w-full justify-center">
            <p className="w-full mt-3">converse.ai</p>
          </div>
          <div className="mt-4 flex flex-col items-start space-y-2">
            {exampleMessages.map((message, index) => (
              <Button
                key={index}
                variant="link"
                className="h-auto p-0 text-base"
                onClick={() => setInput(message.message)}
              >
                <ArrowRight className="mr-2 text-muted-foreground" />
                {message.heading}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
