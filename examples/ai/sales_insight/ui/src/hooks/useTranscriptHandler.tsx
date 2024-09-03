// just some functions to handle clicks and such

import { useState } from 'react';

export const useTranscriptHandler = (tenantId: string) => {
  const [transcriptContent, setTranscriptContent] = useState<string[]>([]);
  const [selectedTranscript, setTranscript] = useState<string[]>([]);

  const handleTranscriptClick = async (file: string) => {
    try {
      const response = await fetch(`/api/transcript-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenant_id: tenantId,
          transcript_name: file,
        }),
      });
      const resp = await response.json();
      setTranscriptContent([resp.content]);
      setTranscript([file]);
    } catch (error) {
      console.error("Error fetching file content:", error);
      setTranscriptContent([]);
    }
  };

  return {
    transcriptContent,
    selectedTranscript,
    handleTranscriptClick,
  };
};