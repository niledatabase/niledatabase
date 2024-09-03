// just some functions to handle clicks and such

import { useState } from 'react';
import { TranscriptItem } from "../types/types";

export const useTranscriptHandler = (tenantId: string) => {
  const [transcriptContent, setTranscriptContent] = useState<TranscriptItem[]>([]);
  const [selectedTranscript, setTranscript] = useState<string[]>([]);

  const handleTranscriptClick = async (conversation_id: string) => {
    try {
      const headers: HeadersInit = new Headers();
      headers.set("X-Tenant-Id", tenantId);
      headers.set("Content-Type", "application/json");

      const response = await fetch(`/api/conversations/` + conversation_id, {
        method: "GET",
        headers: headers,

      });
      const resp = await response.json();
      console.log("got transcript")
      console.log(resp)
      setTranscriptContent(resp);
      setTranscript([conversation_id]);
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