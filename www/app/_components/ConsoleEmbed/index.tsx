'use client';

import { useEffect, useRef } from 'react';

type RequestCookieMsg =
  | { type: 'REQUEST_COOKIE'; nonce: string }
  | { type: string; [k: string]: unknown };

export default function ConsoleEmbed({ domain }: { domain?: string }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const channelRef = useRef<MessageChannel | null>(null);

  useEffect(() => {
    if (!domain) return;

    const childOrigin = safeOrigin(domain);
    if (!childOrigin) return;

    const channel = new MessageChannel();
    channelRef.current = channel;

    channel.port1.onmessage = (ev: MessageEvent<RequestCookieMsg>) => {
      const data = ev.data;
      if (!data || data.type !== 'REQUEST_COOKIE') return;

      const nonce = (data as any).nonce;
      if (typeof nonce !== 'string' || !nonce) return;

      fetch('/api/set-console-cookie', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ nonce }),
      })
        .then(async (data) => {
          if (data.ok) {
            channel.port1.postMessage({ type: 'COOKIE_SET_OK' });
          } else {
            const message = await data.text();
            channel.port1.postMessage({
              type: 'COOKIE_SET_FAILED',
              message,
            });
          }
        })
        .catch(() => channel.port1.postMessage({ type: 'COOKIE_SET_FAIL' }));
    };

    channel.port1.start();

    function onReady(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (!isSubdomain(e.origin)) return;
      if (
        !(
          e.data &&
          typeof e.data === 'object' &&
          (e.data as any).type === 'IFRAME_READY'
        )
      )
        return;

      iframeRef.current?.contentWindow?.postMessage(
        { type: 'CONNECT' },
        String(childOrigin), // can't get here from above
        [channel.port2],
      );

      window.removeEventListener('message', onReady);
    }

    window.addEventListener('message', onReady);

    return () => {
      window.removeEventListener('message', onReady);
      try {
        channel.port1.close();
        channel.port2.close();
      } catch {}
      channelRef.current = null;
    };
  }, [domain]);

  return (
    <div className="container mx-auto flex h-[900px] flex-row p-2">
      <iframe
        ref={iframeRef}
        src={`${domain}/embed`}
        className="flex-1 border-0"
      />
    </div>
  );
}

function safeOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

function isSubdomain(origin: string) {
  try {
    const { protocol, hostname } = new URL(origin);
    if (protocol !== 'https:') return false;
    return hostname === 'thenile.dev' || hostname.endsWith('.thenile.dev');
  } catch {
    return false;
  }
}
