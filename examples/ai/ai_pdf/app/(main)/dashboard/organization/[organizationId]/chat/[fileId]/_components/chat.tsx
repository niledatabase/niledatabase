'use client';

import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';
import { useTheme } from 'next-themes';
import { ElementRef, FC, useEffect, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import UserMessage from './user-message';
import AIMessage from './ai-message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { MemoizedReactMarkdown } from './markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import PdfRenderer from '@/components/pdf-renderer';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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

  const { messages, status, sendMessage } = useChat({
    onError(error) {
      toast.error('Error Processing Request');
      console.error(error);
    },
  });

  const [input, setInput] = useState('');
  const isLoading = status === 'streaming' || status === 'submitted';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(
      { text: input },
      {
        body: {
          fileId: fileId,
          user_id: userId,
          tenant_id: tenant_id,
        },
      },
    );
    setInput('');
  };

  const { theme } = useTheme();
  const scrollRef = useRef<ElementRef<'div'>>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = (content: string) => {
    if (isCopied) return;
    copyToClipboard(content);
    toast.success('Message Copied to Clipboard');
  };
  console.log(pastMessages);
  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="w-full">
        <ResizablePanel className="max-h-[85vh] w-[50vw]">
          <PdfRenderer url={url} />{' '}
        </ResizablePanel>
        <ResizableHandle className="mx-5" withHandle />
        <ResizablePanel className="overflow-x-hidden last:mb-12">
          <ScrollArea className="h-[77vh] w-full overflow-auto overflow-x-hidden">
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
              ''
            )}
            {messages.map((m) => {
              const content = m.parts
                ? m.parts
                    .filter((part) => part.type === 'text')
                    .map((part) => part.text)
                    .join('')
                : '';
              return (
                <div
                  key={m.id}
                  className={cn('group whitespace-pre-wrap', {
                    'max-w-lg gap-x-8 rounded-lg p-4 text-right text-blue-500':
                      m.role === 'user',
                    'flex w-full max-w-lg items-start gap-x-8 rounded-lg bg-muted p-4 text-green-500':
                      m.role !== 'user',
                    'prose-p:text-indigo-400 prose-li:text-indigo-400':
                      m.role === 'user',
                  })}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    className="prose dark:prose-invert prose-ul:m-0 prose-li:m-0 prose-p:my-0 prose-h3:my-0 text-base"
                  >
                    {content}
                  </ReactMarkdown>
                  <Button
                    onClick={() => onCopy(content)}
                    className="hidden group-hover:block"
                    size="icon"
                    variant="ghost"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
            {/* <div className="bg-white">Some</div> */}
            <form onSubmit={handleSubmit}>
              {isLoading && (
                <div className="mt-10 flex w-1/2 items-center justify-center rounded-lg bg-muted p-4">
                  <BeatLoader
                    color={theme === 'light' ? 'black' : 'white'}
                    size={5}
                  />
                </div>
              )}
              <div ref={scrollRef} />
              <Input
                className="fixed bottom-0 mb-8 min-h-4 w-[80vw] max-w-md rounded border border-gray-300 p-2 shadow-xl md:w-full"
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
