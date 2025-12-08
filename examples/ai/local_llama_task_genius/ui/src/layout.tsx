/// <reference types="vite-plugin-svgr/client" />
import '@fontsource/inter';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import './assets/globals.css';
import styles from './assets/page.module.css';
import { ReactNode } from 'react';

import NileLogo from './assets/nile_logo.svg?react';
import PythonLogo from './assets/python_logo.svg?react';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export default function Layout({ children }: Props) {
  console.log(window.location.pathname);
  return (
    <main className={styles.main}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div className={styles.description}>
          <div>
            <PythonLogo width="50px" height="50px" />
          </div>
          <div>
            <a
              href="https://thenile.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Created by{'    '}
              <NileLogo
                width="100px"
                height="37px"
                style={{ marginLeft: '15px' }}
              />
            </a>
          </div>
        </div>
        {window.location.pathname === '/' ? null : (
          <div className={styles.logout}>
            <Link href="/?logout" style={{ color: 'black' }}>
              [ Logout ]
            </Link>
          </div>
        )}
      </div>
      <div>
        <Stack>
          <Typography level="h2" textAlign="center" maxWidth="800px">
            TaskGenius - Task manager with ai-based estimates
          </Typography>
          <Typography level="body-lg" textAlign="center" maxWidth="800px">
            Using LlamaIndex, Llama 3.2 model and running local Ollama, we can
            automatically estimate the time to complete a task based on the task
            description and previous tasks - but only those that belong to the
            same tenant.
          </Typography>
        </Stack>
      </div>
      {children}
      <div className={styles.grid}>
        <Card
          variant="outlined"
          sx={{
            '--card-padding': '1rem',
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <Link
            overlay
            href="https://www.thenile.dev/docs/getting-started/languages/python"
            target="_blank"
            rel="noopener"
          >
            <PythonLogo width="50px" height="50px" />
          </Link>
          <CardContent>
            <Typography>Getting started guide</Typography>
          </CardContent>
        </Card>
        <Card
          variant="outlined"
          sx={{
            '--card-padding': '1rem',
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <Link
            overlay
            href="https://thenile.dev"
            target="_blank"
            rel="noopener"
          >
            <NileLogo width="120px" height="44.4px" />
          </Link>
          <CardContent>
            <Typography>Sign up to Nile</Typography>
          </CardContent>
        </Card>

        <Card
          variant="outlined"
          sx={{
            '--card-padding': '1rem',
            '&:hover': {
              boxShadow: 'md',
              borderColor: 'neutral.outlinedHoverBorder',
            },
          }}
        >
          <Link
            overlay
            href="https://www.thenile.dev/templates"
            target="_blank"
            rel="noopener"
          >
            <NileLogo width="120px" height="44.4px" />
          </Link>
          <CardContent>
            <Typography>Try additional templates</Typography>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
