import styles from "@/app/page.module.css";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListDivider from "@mui/joy/ListDivider";
import Stack from "@mui/joy/Stack";
import NextLink from "next/link";
import MUILink from "@mui/joy/Link";
import { cookies } from "next/headers";
import { AddForm } from "./add-form";
import { DoneForm } from "./done-form";
import { configureNile } from "@/lib/NileServer";

// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Todo: replace "raw" context setting with nicer SDK
export default async function Page({
  params,
}: {
  params: { tenantid: string };
}) {
  // Here we are getting a connection to a specific tenant database for the current usr
  // if we already got such connection earlier, it will reuse the existing one
  const tenantNile = await configureNile(
    cookies().get("authData"),
    params.tenantid
  );

  console.log(
    "showing todos for user " +
      tenantNile.userId +
      " for tenant " +
      tenantNile.tenantId
  );
  const todos = await tenantNile.db.query("select * from todos order by title"); // no need for where clause because we previously set Nile context
  // Get tenant name doesn't need any input parameters because it uses the tenant ID and user token from the context
  const resp = await tenantNile.api.tenants.getTenant();
  const tenant = await resp.json();
  return (
    <Stack spacing={2} width={"50%"}>
      <Typography
        level="h2"
        textAlign={"center"}
        sx={{ textTransform: "uppercase" }}
      >
        {tenant.name}&apos;s Todos
      </Typography>
      <MUILink href="/tenants" component={NextLink} justifyContent={"center"}>
        (Back to tenant selection){" "}
      </MUILink>
      <List variant="plain" size="lg">
        <ListItem>
          <AddForm tenantid={tenantNile.tenantId!} />
        </ListItem>
        <ListDivider />
        {todos.rows.map((todo: any) => (
          <div
            key={todo.id}
            style={{ display: "flex", flexWrap: "nowrap", padding: "0.5rem" }}
          >
            <ListItem key={todo.id}>
              <DoneForm tenantId={tenantNile.tenantId!} todo={todo} />
            </ListItem>
            <ListDivider />
          </div>
        ))}
      </List>
    </Stack>
  );
}
