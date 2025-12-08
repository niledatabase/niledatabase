'use client';
import { Button } from '@/components/ui/button';
// import { useToast } from "@/components/ui/use-toast";
// import { File } from "@prisma/client";
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { set } from 'react-hook-form';
import { toast } from 'sonner';

// interface IndexButtonProps {
//   file: File;
// }

const IndexButton = ({ file }: { file: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/index', { file });
      console.log('indexing api responded with: ' + response.status);
      router.refresh();
      if (response.status === 200) {
        toast.success('Successfully generated embedding and indexed file');
        router.refresh();
      } else {
        const error = response.data;
        toast.error('Failed to generate embedding and index file: ' + error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong ' + error);
      setLoading(false);
    }
  };
  return (
    <>
      {file.isIndex ? (
        <h1>File successfully indexed</h1>
      ) : (
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? 'Indexing...' : 'Embed File'}
        </Button>
      )}
    </>
  );
};

export default IndexButton;
