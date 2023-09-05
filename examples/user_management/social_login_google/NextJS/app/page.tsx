'use client';

import styles from './page.module.css';

import { GoogleLoginButton, NileProvider } from "@theniledev/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <NileProvider
        basePath={String(process.env.NILE_BASE_PATH)}
      >
        <GoogleLoginButton 
                workspace={String(process.env.WORKSPACE)}
                database={String(process.env.DATABASE)}
        />
      </NileProvider>
    </main>
  );
}
