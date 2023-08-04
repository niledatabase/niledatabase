'use client';

import styles from './page.module.css';

import { GoogleSSOButton, NileProvider } from "@theniledev/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <NileProvider
        workspace={String(process.env.WORKSPACE)}
        database={String(process.env.DATABASE)}
        basePath={String(process.env.NILE_BASE_PATH)}
      >
        <GoogleSSOButton />
      </NileProvider>
    </main>
  );
}
