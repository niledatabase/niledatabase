'use client';

import { useState } from 'react';

type CodeEditorProps = {
  tabs?: Record<string, string>;
  defaultTab?: string;
};

const defaultCodeExamples: Record<string, string> = {
  component: `import TenantSelector from '@niledatabase/react';
export default function App() {
  return <TenantSelector />;
}`,

  api: `const tenant = await nile.api.tenants.createTenant(tenantName);
if (tenant instanceof Response) {
  console.log("ERROR creating tenant: ", tenant);
  return { message: "no tenant" };
}
tenantID = tenant.id;
console.log("created tenant with tenantID: ", tenantID);`,

  sql: `select id,name from tenants;

id                                     name
--------------------------------------|-----------------
018ade1a-7843-7e60-9686-714bab650998 | Acme Corporation
018ade1b-9152-7cde-b789-123def456abc | TechStart Inc.
018ade1c-4567-8abc-def0-987654321fed | CloudScale Ltd.`,
};

export const setupCodeExamples: Record<string, string> = {
  'nile.ts': `import { Nile } from "@niledatabase/server";
export const nile = await Nile();
export const { handlers } = nile.api;`,

  'route.ts': `import { handlers } from "./nile";
export const { POST, GET, DELETE, PUT } = handlers;`,

  'page.jsx': `import {
  SignOutButton,
  SignUpForm,
  SignedIn,
  SignedOut,
  TenantSelector,
  UserInfo,
} from "@niledatabase/react";


export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignedIn className="flex flex-col gap-4">
        <UserInfo />
        <TenantSelector className="py-6 mb-10" />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignUpForm createTenant />
      </SignedOut>
    </div>
  );
}`,
};

export const socialLoginExamples = {
  google: `import { Google } from '@niledatabase/react';

function App() {
  return (
    <div>
      <Google callbackUrl="/" />
    </div>
  );
}`,
  github: `import { GitHub } from '@niledatabase/react';

function App() {
  return (
    <div>
      <GitHub callbackUrl="/" />
    </div>
  );
}`,
  discord: `import { DiscordSignInButton } from '@niledatabase/react';

function App() {
  return (
    <div>
      <DiscordSignInButton callbackUrl="/" />
    </div>
  );
}`,
  linkedin: `import { LinkedIn } from '@niledatabase/react';

function App() {
  return (
    <div>
      <LinkedIn callbackUrl="/" />
    </div>
  );
}`,
  hubspot: `import { HubSpot } from '@niledatabase/react';

function App() {
  return (
    <div>
      <HubSpotSignInButton callbackUrl="/" />
    </div>
  );
}`,
  microsoft: `import { AzureSignInButton } from '@niledatabase/react';

function App() {
  return (
    <div>
      <AzureSignInButton callbackUrl="/" tenantId="YOUR_TENANT_ID" />
    </div>
  );
}`,
};

export const authExamples: Record<string, string> = {
  users: `const user1 = await nile.api.users.createUser({ email: 'user1@example.com', password: 'user1', newTenant: 'myTenant' });
const user2 = await nile.api.users.createUser({ email: 'user2@example.com', password: 'user2' });
// make user1 and user2 part of the same tenant
const updated2 = await nile.api.users.linkUser(user2.id);`,

  sessions: `import { Nile } from "@niledatabase/server";

const nile = await Nile();

app.get("/some-path", async (req, res) => {
  const session = await nile.api.auth.session(req);
  if (!session) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  res.json({
    message: "You are authorized",
  });
});`,

  'reset-password': `import { PasswordResetRequestForm } from "./path/to/ResetForm";

const MyComponent = () => {
  return <PasswordResetRequestForm callbackUrl="/change-password" />;
};`,

  'change-password': `<PasswordResetForm
  defaultValues={{ email: "user@example.com" }}
  onSuccess={() => console.log("Password updated successfully")}
  onError={(error) => console.error("Update failed", error)}
/>`,
};

export const databaseExamples: Record<string, string> = {
  tenants: `select id, name from "tenants";

id                                     | name
---------------------------------------|------------------
018ade1a-7843-7e60-9686-714bab650998  | Acme Corporation
018ade1b-9152-7cde-b789-123def456abc  | TechStart Inc.
018ade1c-4567-8abc-def0-987654321fed  | CloudScale Ltd.`,

  users: `select id, name, email, email_verified from "users"."users";

id                                     | name           | email                     | email_verified
---------------------------------------|----------------|---------------------------|-------------------------
018ade2a-1234-5678-9abc-def012345678  | John Smith     | john@example.com         | 2024-03-15 10:30:00 UTC
018ade2b-2345-6789-abcd-ef0123456789  | Sarah Johnson  | sarah@techstart.com      | 2024-03-14 15:45:00 UTC
018ade2c-3456-7890-bcde-f01234567890  | Mike Brown     | mike@cloudscale.com      | 2024-03-13 09:20:00 UTC`,

  tenant_users: `select tenant_id, user_id, email from "users"."tenant_users";

tenant_id                              | user_id                                | email
---------------------------------------|----------------------------------------|-------------------------
018ade1a-7843-7e60-9686-714bab650998  | 018ade2a-1234-5678-9abc-def012345678  | john@example.com
018ade1b-9152-7cde-b789-123def456abc  | 018ade2b-2345-6789-abcd-ef0123456789  | sarah@techstart.com
018ade1c-4567-8abc-def0-987654321fed  | 018ade2c-3456-7890-bcde-f01234567890  | mike@cloudscale.com`,
};

export const selfHostExamples: Record<string, string> = {
  managed: `NILEDB_USER=niledb_user
NILEDB_PASSWORD=niledb_password
NILEDB_API_URL=https://us-west-2.api.thenile.dev/v2/databases/<database_id>
NILEDB_POSTGRES_URL=postgres://us-west-2.db.thenile.dev:5432/<database_name>`,
  'self host': `docker run -d \\
  --name nile-auth-server \\
  -p 3001:3001 \\
  -e NODE_ENV=production \\
  -e NEXT_TELEMETRY_DISABLED=1 \\
  -e NILEDB_HOST=<your-niledb-host> \\
  -e NILEDB_USER=<your-niledb-user> \\
  -e NILEDB_PASSWORD=<your-niledb-password> \\
  nile-auth-server`,
};

function highlightCode(code: string): string {
  if (!code) return ''; // Add safety check for undefined or empty code

  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const lines = code.split('\n');
  const lineNumbers = lines
    .map(
      (_, i) =>
        `<span class="select-none text-[#636669] w-[40px] inline-block text-right pr-4">${
          i + 1
        }</span>`,
    )
    .join('\n');

  const highlightedCode = lines
    .map((line) => {
      let highlighted = escapeHtml(line);

      // Apply syntax highlighting
      highlighted = highlighted
        // Keywords
        .replace(
          /\b(const|let|var|return|export|default|async|await|function|import|from|if)\b/g,
          '<span style="color: #E06C75">$1</span>',
        )
        // Built-in objects and types
        .replace(
          /\b(Response|console)\b/g,
          '<span style="color: #E5C07B">$1</span>',
        )
        // JSX Components and HTML tags
        .replace(
          /(&lt;\/?)([\w-]+)/g,
          '$1<span style="color: #E06C75">$2</span>',
        )
        // SQL Keywords
        .replace(
          /\b(select|from)\b/gi,
          '<span style="color: #E06C75">$1</span>',
        )
        // String literals
        .replace(
          /(&quot;.*?&quot;|&#039;.*?&#039;)/g,
          '<span style="color: #98C379">$1</span>',
        )
        // Imports and exports
        .replace(/({[^}]+})/g, '<span style="color: #61AFEF">$1</span>')
        // Function calls
        .replace(/\b(\w+)(?=\()/g, '<span style="color: #61AFEF">$1</span>')
        // Property access
        .replace(/\.(\w+)/g, '.<span style="color: #98C379">$1</span>');

      return highlighted;
    })
    .join('\n');

  return `<div class="flex">\n<div class="line-numbers">${lineNumbers}</div>\n<div class="code-content">${highlightedCode}</div>\n</div>`;
}

export default function MultiTenantCodeEditor({
  tabs = defaultCodeExamples,
  defaultTab,
}: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTab || Object.keys(tabs)[0],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#000000]">
      <div className="flex items-center bg-[#000000] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FF5F57]"></div>
          <div className="h-3 w-3 rounded-full bg-[#FEBC2E]"></div>
          <div className="h-3 w-3 rounded-full bg-[#28C840]"></div>
        </div>
        <div className="ml-6 flex gap-4">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-sm transition-colors ${
                activeTab === tab
                  ? 'rounded-md bg-[#000000] text-white/90'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6 font-mono text-sm">
        <pre
          className="overflow-x-auto whitespace-pre leading-6 text-[#e4e4e4]"
          dangerouslySetInnerHTML={{
            __html: highlightCode(tabs[activeTab]),
          }}
        />
      </div>
    </div>
  );
}
