'use client';
import { Button } from '@/components/ui/button';
// import { useToast } from "@/components/ui/use-toast";
import { Copy } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface AIMessageProps {
  text: string;
}

const AIMessage: FC<AIMessageProps> = ({ text }) => {
  const onCopy = () => {
    if (!text) {
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success('Message Copied to Clipboard');
  };
  return (
    <>
      <div className="group flex w-full max-w-lg items-start gap-x-8 rounded-lg bg-muted p-4 text-green-500">
        {/* <ReactMarkdown
          components={{
            pre: ({ node, ...props }) => (
              <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg text-blue-400">
                <pre {...props} />
              </div>
            ),
            code: ({ node, ...props }) => (
              <code
                className="bg-black/10 rounded-lg p-1 text-indigo-300"
                {...props}
              />
            ),
            a: ({ node, ...props }) => (
              <a target="_blank" rel="noopener noreferrer" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-green-400 my-3" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-5 last:mb-0" {...props} />
            ),
          }}
          className="text-base overflow-hidden leading-7"
        >
          {text}
        </ReactMarkdown> */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          className="prose dark:prose-invert prose-ul:m-0 prose-li:m-0 prose-p:my-0 prose-h3:my-0 text-base"
        >
          {text}
        </ReactMarkdown>
        <Button
          onClick={onCopy}
          className="opacity-0 transition group-hover:opacity-100"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default AIMessage;
