"use client";

import { NileProvider } from "@niledatabase/react";

export default function NileContext(props: { children: JSX.Element }) {
  {
    /* Note that client side components use the local /api endpoint as the base path */
  }
  return (
    <NileProvider appUrl={String(process.env.NEXT_PUBLIC_APP_URL)}>
      {props.children}
    </NileProvider>
  );
}
