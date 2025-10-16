"use client";

import { useEffect, useRef } from "react";

type RequestCookieMsg =
  | { type: "REQUEST_COOKIE"; nonce: string }
  | { [k: string]: unknown };

export default function ConsoleEmbed({
  domain,
}: {
  domain: string | undefined;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== domain) return;

      let data: RequestCookieMsg;
      try {
        data =
          typeof e.data === "string"
            ? (JSON.parse(e.data) as any)
            : (e.data as any);
      } catch {
        return;
      }

      if (data?.type !== "REQUEST_COOKIE") return;

      const nonce = (data as any).nonce;
      if (typeof nonce !== "string" || !nonce) return;

      fetch("/api/set-console-cookie", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ nonce }),
      })
        .then(() => {
          // Reply to the iframe
          iframeRef.current?.contentWindow?.postMessage(
            { type: "COOKIE_SET_OK" },
            domain
          );
        })
        .catch(() => {
          iframeRef.current?.contentWindow?.postMessage(
            { type: "COOKIE_SET_FAIL" },
            domain
          );
        });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [domain]);

  return (
    <div className="container mx-auto h-[900px] flex flex-row p-2">
      <iframe
        ref={iframeRef}
        src={`${domain}/embed`}
        className="border-0 flex-1"
      />
    </div>
  );
}
