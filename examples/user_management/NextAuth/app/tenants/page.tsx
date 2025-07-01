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
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { Nile } from "@niledatabase/server";

const nile = Nile();
// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Page() {
  // This is the tenant selector, so we use Nile with just the current user and reset tenant_id if already set
  // if Nile is already configured for this user, it will reuse the existing Nile instance
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const userId = session?.user?.id;
  console.log("showing tenants page for user: " + userId);
  let tenants: any = [];

  if (userId) {
    const res = await nile.db.query(
      `SELECT tenants.id, tenants.name
       FROM tenants
       JOIN users.tenant_users ON tenants.id = tenant_users.tenant_id
       WHERE tenant_users.user_id = $1`,
      [userId]
    );
    if (res) {
      tenants = res.rows;
    }
  } else {
    // unauthenticated user, so we show them the way out
    redirect("/");
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
                  href={`/tenants/${tenant.id}/todos`}
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
            You are logged in as {session?.user?.email}{" "}
            <MUILink href="/api/auth/signout" component={NextLink}>
              (Logout)
            </MUILink>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
