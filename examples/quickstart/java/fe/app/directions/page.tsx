import { v4 as uuidv4 } from "uuid";
import Code from "./Code";
import { headers as nextHeaders } from "next/headers";
import { nile } from "../api/[...nile]/nile";
import { UserInfo } from "@niledatabase/react";

const backendServer = String(
  process.env.NEXT_PUBLIC_BASE_PATH || "http://localhost:3001"
);

export default async function Page() {
  const headers = await nextHeaders();
  const me = await nile.api.users.me(headers);
  if (me instanceof Response) {
    return <div>Unauthorized</div>;
  }
  const userID = me.id;

  // we'll generate a random UUIDs here instead of using the auto-gen one in Nile. Just to make it easier to follow the demo.
  const tenantID = uuidv4();
  const tenant2ID = uuidv4();

  // Note that for this example, the BE login is basic auth with user ID with a blank password.
  // This is ok for a demo (Stripe has similar auth scheme)
  // Using "auth bearer" header with a JWT token is a more common practice, that looks worse in a demo.
  const codeString = `
  # Create a tenant:
  curl --location --request POST '${backendServer}/api/tenants' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"id":"${tenantID}", "name":"my first customer"}'

  # Create a todo item:
  curl -X POST '${backendServer}/api/tenants/${tenantID}/todos' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"title": "feed the cat", "complete": false}'

  # Create a second tenant and a todo item for that tenant:
  curl --location --request POST '${backendServer}/api/tenants' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"id":"${tenant2ID}", "name":"a different customer"}'

  curl -X POST '${backendServer}/api/tenants/${tenant2ID}/todos' \\
  --header 'Content-Type: application/json' \\
  --user '${userID}:' \\
  --data-raw '{"title": "take out the trash", "complete": false}'

  # List all todos for the first tenant:
  # This endpoint uses Nile's tenant isolation feature to only show todos to the tenant in the URL path.
  curl -X GET '${backendServer}/api/tenants/${tenantID}/todos' \\
  --user '${userID}:'

  # List your tenants:
  curl -X GET '${backendServer}/api/tenants' --user '${userID}:'

  # This endpoint will show you all todos for all tenants
  # For demo purposes, we excluded it from the tenant isolation.
  curl -X GET '${backendServer}/insecure/all_todos' \\
  --user '${userID}:'
  `;

  return (
    <div className="flex flex-col gap-2 mt-10">
      <div>This demo shows a backend service for a Todo List application</div>
      <div>
        You can experiment with it by running the following commands in your
        terminal:
      </div>

      <div style={{ whiteSpace: "pre-line", padding: "0 0 2rem 0" }}></div>
      <Code codeString={codeString} />
    </div>
  );
}