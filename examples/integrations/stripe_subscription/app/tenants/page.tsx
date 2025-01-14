import { cookies } from "next/headers";
import styles from "../page.module.css";
import NextLink from "next/link";
import MUILink from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { AddForm } from "@/app/tenants/add-form";
import { nile } from "../api/[...nile]/nile";
import { redirect } from "next/navigation";

// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Page() {
  // This is the tenant selector, so we use Nile with just the current user and reset tenant_id if already set
  // if Nile is already configured for this user, it will reuse the existing Nile instance
  console.log("showing tenants page for user: " + nile.userId);

  const headers = new Headers({ cookie: cookies().toString() });
  const [tenants, me] = await Promise.all([
    nile.api.tenants.listTenants(headers),
    nile.api.users.me(headers),
  ]);

  if (tenants instanceof Response) {
    // signed out
    if (tenants.status === 401) {
      return redirect("/");
    }
    throw Error(await tenants.text());
  }
  if (me instanceof Response) {
    throw Error(await me.text());
  }

  return (
    <div className={styles.center}>
      <Card variant="outlined">
        {" "}
        {/* TODO: need drop shadow */}
        {/* TODO: Avatar or Icon with small DB image*/}
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <AddForm />
          </div>
        </CardContent>
        <Divider>or</Divider>
        <CardContent>
          <Typography level="title-md" textAlign="center" padding={2}>
            Use Existing Tenant
          </Typography>
          <List variant="outlined">
            {tenants.map((tenant: any) => (
              <ListItem key={tenant.id}>
                <ListItemButton
                  component={NextLink}
                  href={`/tenants/${tenant.id}/billing`}
                >
                  {tenant.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardContent>
          <Typography level="body-md" textAlign="center">
            {" "}
            You are logged in as {me.email}{" "}
            <MUILink href="api/logout" component={NextLink}>
              (Logout)
            </MUILink>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
