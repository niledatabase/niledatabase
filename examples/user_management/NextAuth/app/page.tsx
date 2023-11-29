'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { signIn } from "next-auth/react"

export default function Home() {
  // This demo supports both Google and email/password auth. 
  // If this is the first time trying Nile, email/password will be simpler.
  // set AUTH_TYPE="google" to use Google auth
  const authType = process.env.AUTH_TYPE 
  return (
    <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
          <Stack gap={5} sx={{ maxWidth: '40rem' }} alignItems={'center'}>
          <form
              onSubmit={(event) => {
                console.log("handling submit")
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                console.log(data.entries().next().value[1])
                const email = data.entries().next().value[1];
                signIn("email", { email, callbackUrl: "/tenants"})
              }}>
            <label>
              <Typography> Email address </Typography>
              <Input type="email" id="email" name="email"/>
            </label>
            <Button type="submit">Sign in with Email</Button>
            </form>
            </Stack>
    </div>
  )
}