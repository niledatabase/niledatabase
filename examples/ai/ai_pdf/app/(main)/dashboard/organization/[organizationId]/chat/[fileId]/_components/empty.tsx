"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseChatHelpers } from "ai/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const exampleMessages = [
  {
    heading: "Summarize document",
    message: `Can you summarize this document?`,
  },
  {
    heading: "Key concepts",
    message: "Can you tell me about the key concepts from this document?",
  },
//   {
//     heading: "Outerbase implementation",
//     message: "How is outerbase being used in this application?",
//   },
];

export function EmptyStateAI({ setInput }: Pick<UseChatHelpers, "setInput">) {
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTypingDone(true);
    }, 14500);

    return () => clearTimeout(timer); // This will clear the timeout if the component unmounts before the timeout finishes
  }, []);
  return (
    <>
      {!isTypingDone && (
        <div className="text-2xl font-ranadeRegular">
          <Typewriter
            options={{
              strings: ["Welcome", "Ask a question related to this document"],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      )}
      {isTypingDone && (
        <Card className="p-5 bg-muted font-ranadeLight">
          <div className="flex flex-col items-center w-full justify-center">
            <p className="w-full mt-3">
             converse.ai
            </p>
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