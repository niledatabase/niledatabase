import React from "react";
import "@fontsource/inter";
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import './css/globals.css'
import styles from './css/page.module.css'
import { ReactComponent as NileLogo } from './images/nile_logo.svg';
import { ReactComponent as NodeLogo } from './images/node.svg';

export default function Layout({children}) {
  return (
    <html lang="en">
      <body fontFamily="Inter">
        <main className={styles.main}>
        <div className={styles.description}>
        <div>
          <NodeLogo className={styles.logo} />
        </div>
        <div>
          <a
            href="https://thenile.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by{' '}
            <NileLogo className={styles.logo} />
          </a>
        </div>
      </div>
      <div>
        <Stack> 
        <Typography level="h2">Yet Another Todo Application</Typography>
        </Stack>
      </div>
          {children}
          <div className={styles.grid}>
        <Card variant="outlined"
              sx={{
                '--card-padding': '1rem',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
              }}>
          <Link overlay href="https://niledatabase-www.vercel.app/docs/getting-started/languages/nextjs" target="_blank" rel="noopener">
            <NodeLogo className={styles.logo} />
            </Link>
          <CardContent>
            <Typography>Getting started guide</Typography>
          </CardContent>
        </Card>

        <Card variant="outlined"
              sx={{
                '--card-padding': '1rem',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
              }}>
          <Link overlay href="https://console.thenile.dev"  target="_blank" rel="noopener">
            <NileLogo className={styles.logo} />
            </Link>
          <CardContent>
            <Typography>Sign up to Nile</Typography>
          </CardContent>
        </Card>

        <Card variant="outlined"
              sx={{
                '--card-padding': '1rem',
                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
              }}>
          <Link overlay href="https://niledatabase-www.vercel.app/templates"  target="_blank" rel="noopener">
            <NileLogo className={styles.logo} />
          </Link>
          <CardContent>
            <Typography>Try additional templates</Typography>
          </CardContent>
        </Card>
      </div>
        </main>
      </body>
    </html>
  )
}
