// just some functions to handle clicks and such

import { useState, useEffect } from 'react';
import { TranscriptItem } from "../types/types";

export const useTranscriptHandler = (tenantId: string, transcripts: string[]) => {
  const [transcriptContent, setTranscriptContent] = useState<TranscriptItem[]>([]);
  const [selectedTranscript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    if (transcripts.length > 0 && selectedTranscript.length == 0) { // if nothing was selected, show default
      console.log("loading transcript with " + transcripts[0])
      handleTranscriptClick(transcripts[0]);
    }
  }, [transcripts]); // depends on transcripts so it will run after they load

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