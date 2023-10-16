import React from "react";
import "@fontsource/inter";
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import './css/globals.css'
import styles from './css/page.module.css'
import { Route, useLocation, Link as RLink } from "react-router-dom";
import { ReactComponent as NileLogo } from './images/nile_logo.svg';
import { ReactComponent as NodeLogoRight } from './images/node_logo_r.svg';
import { ReactComponent as NodeLogoBottom } from './images/node_logo_b.svg';

export default function Layout({children}) {
  console.log(window.location.pathname)
  return (
        <main className={styles.main} fontFamily="Inter">
        <div style={{display: 'flex', flexDirection:'column', width:'100%'}}>
        <div className={styles.description}>
        <div>
          <NodeLogoRight width="133.5px" height="82px" />
        </div>
        <div>
          <a
            href="https://thenile.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by{'    '}
            <NileLogo width="100px" height="37px" style={{marginLeft:"15px"}}/>
          </a>
        </div>
      </div>
      {
      window.location.pathname === "/" ? null : 
            <div className={styles.logout}>
              <Link href="/?logout" style={{color:"black"}}>[ Logout ]</Link>
            </div>
      }
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
          <Link overlay href="https://niledatabase-www.vercel.app/docs/getting-started/languages/node" target="_blank" rel="noopener">
          <NodeLogoBottom width="115.6px" height="70.8px"/>
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
          <NileLogo width="120px" height="44.4px" />
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
          <NileLogo width="120px" height="44.4px" />
          </Link>
          <CardContent>
            <Typography>Try additional templates</Typography>
          </CardContent>
        </Card>
      </div>
        </main>
  )
}
