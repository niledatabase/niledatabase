'use client';
// ^^^ required by the syntax highighter. Note that this also means that I can't use NextJS cookies here (they are for the server side only)
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Card from '@mui/material/Card';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import "highlight.js/styles/github-dark.css";
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

export default function Page() {
    
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

  const backendServer = String(process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:8080");
  const raw = Cookies.get('authData');
  const authData = raw ? JSON.parse(decodeURIComponent(raw)) : null;
  var userID = "<user id>"
  if (authData) {
    userID = authData.tokenData?.sub;
  }

  // we'll generate a random UUID here instead of using the auto-gen one in Nile. Just to make it easier to follow the demo.
  const tenantID = uuidv4();
  const tenant2ID = uuidv4();

  const introText = `This demo shows a backend service for a Todo List application.
                    You can experiment with it by running the following commands in your terminal:`

  const codeString = `
  # Create a tenant:
  curl --location --request POST '${backendServer}/tenants' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"id":"${tenantID}", "name":"my first customer"}'
  
  # Create a todo item:
  curl -X POST '${backendServer}/tenants/${tenantID}/todos' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"title": "feed the cat", "complete": false}'

  # Create a second tenant and a todo item for that tenant:
  curl --location --request POST '${backendServer}/tenants' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"id":"${tenant2ID}", "name":"a different customer"}'

  curl -X POST '${backendServer}/tenants/${tenant2ID}/todos' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"title": "take out the trash", "complete": false}'
  
  # List all todos for the first tenant:
  # This endpoint uses Nile's tenant isolation feature to only show todos to the tenant in the URL path.
  curl -X GET '${backendServer}/tenants/${tenantID}/todos' \\
  --user '${userID}:'

  # List your tenants:
  curl -X GET '${backendServer}/tenants' --user '${userID}:'
  
  # This endpoint will show you all todos for all tenants
  # For demo purposes, we excluded it from the tenant isolation.
  curl -X GET '${backendServer}/insecure/all_todos'

  return (
    <Stack direction="column" spacing={2}>
            <Typography level="body-md" style={{whiteSpace: 'pre-line'}}> {introText} </Typography>
            {isClient ? 
                <SyntaxHighlighter language="bash" 
                    useInlineStyles={false}
                    wrapLines={true}>
                {codeString}
                </SyntaxHighlighter> 
            : null}
    </Stack>
  );
}