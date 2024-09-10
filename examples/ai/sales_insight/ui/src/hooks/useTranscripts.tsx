import { useState, useEffect } from "react";

export const useTranscripts = (tenantId: string) => {
  const [transcripts, setTranscripts] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const headers: HeadersInit = new Headers();
      headers.set("X-Tenant-Id", tenantId);
      headers.set("Content-Type", "application/json");

      try {
        console.log("getting transcripts");
        const response = await fetch("/api/conversations", {
          method: "GET",
          headers: headers,
        });
        const resp = await response.json();
        console.log("got transcripts", resp);
        setTranscripts(resp);
      } catch (error) {
        console.error("Error fetching transcripts:", error);
      }
    };

    fetchFiles();
  }, [tenantId]);

  return transcripts;
};
