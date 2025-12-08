'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const exampleMessages = [
  {
    heading: 'Summarize document',
    message: `Can you summarize this document?`,
  },
  {
    heading: 'Key concepts',
    message: 'Can you tell me about the key concepts from this document?',
  },
];

export function EmptyStateAI({
  setInput,
}: {
  setInput: (value: string) => void;
}) {
  return (
    <>
      <div className="font-ranadeRegular text-2xl">
        {' '}
        Welcome! Ask a question related to this document.{' '}
      </div>
      <Card className="font-ranadeLight bg-muted p-5">
        <div className="flex w-full flex-col items-center justify-center">
          <p className="mt-3 w-full">converse.ai</p>
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
    </>
  );
}
