import styles from "@/app/page.module.css";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";
import NextLink from "next/link";
import MUILink from "@mui/joy/Link";
import { cookies } from "next/headers";
import { configureNile } from "@/lib/NileServer";
import {
  createCheckoutSession,
  cancelSubscription,
  redirectToStripePortal,
} from "./checkout-actions";
// Forcing to re-evaluate each time.
// This guarantees that users will only see their own data and not another user's data via cache
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

// Todo: replace "raw" context setting with nicer SDK
export default async function Page(props: {
  params: Promise<{ tenantid: string }>;
}) {
  const params = await props.params;
  // Here we are getting a connection to a specific tenant database for the current usr
  // if we already got such connection earlier, it will reuse the existing one
  const tenantNile = await configureNile(params.tenantid);
  const tenantTier = await tenantNile.db.query(
    `SELECT tenant_tier FROM tenants`
  );

  /* console.log(
    "showing org dashboard for user " +
      tenantNile.userId +
      " for tenant " +
      tenantNile.tenantId
  ); */
  // Get tenant name doesn't need any input parameters because it uses the tenant ID and user token from the context
  const tenant = await tenantNile.tenants.get();
  if (tenant instanceof Response) {
    throw new Error("unable to get tenant");
  }
  return (
    <div className={styles.center}>
      <Stack>
        <Typography
          level="h2"
          textAlign={"center"}
          sx={{ textTransform: "uppercase" }}
        >
          {tenant.name}&apos;s Plan and Billing
        </Typography>
        <MUILink href="/tenants" component={NextLink} justifyContent={"center"}>
          (Back to tenant selection){" "}
        </MUILink>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ flexGrow: 1, padding: "2rem" }}
        >
          <Grid xs={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-lg">Free Tier</Typography>
                <Typography level="title-md"> $0/month</Typography>
                <Typography level="body-sm">
                  Free tier plan with very basic SaaS features. Enough to get a
                  taste of the product.
                </Typography>
              </CardContent>

              <CardActions buttonFlex="0 1 120px">
                {tenantTier.rows[0].tenant_tier === "free" ? (
                  <Button disabled variant="outlined">
                    Current Plan
                  </Button>
                ) : (
                  <form action={cancelSubscription}>
                    <input
                      type="hidden"
                      name="tenantid"
                      value={params.tenantid}
                    />
                    <Button id="downgrade-button" variant="solid" type="submit">
                      Downgrade
                    </Button>
                  </form>
                )}
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-lg">Basic SaaS</Typography>
                <Typography level="title-md"> $10/month</Typography>
                <Typography level="body-sm">
                  The basic tier delivers good value for the money. Great for
                  startups and small businesses.
                </Typography>
              </CardContent>
              <CardActions buttonFlex="0 1 120px">
                {tenantTier.rows[0].tenant_tier === "basic" ? (
                  <form action={redirectToStripePortal}>
                    <input
                      type="hidden"
                      name="tenantid"
                      value={params.tenantid}
                    />
                    <Button
                      id="checkout-and-portal-button"
                      variant="outlined"
                      type="submit"
                    >
                      Manage
                    </Button>
                  </form>
                ) : (
                  <form action={createCheckoutSession}>
                    <input
                      type="hidden"
                      name="lookup_key"
                      value="price_1OZKhCJ5pwYvn8BquTcBU84h"
                    />
                    <input
                      type="hidden"
                      name="tenantid"
                      value={params.tenantid}
                    />
                    <Button
                      id="checkout-and-portal-button"
                      variant="solid"
                      type="submit"
                    >
                      Upgrade
                    </Button>
                  </form>
                )}
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-lg">Enterprise </Typography>
                <Typography level="title-md">
                  {" "}
                  Starting at $1000/month
                </Typography>
                <Typography level="body-sm">
                  This tier has advanced security and scale. Great for large
                  companies.
                </Typography>
              </CardContent>
              <CardActions buttonFlex="0 1 120px">
                {tenantTier.rows[0].tenant_tier === "enterprise" ? (
                  <Button id="checkout-and-portal-button" variant="outlined">
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    id="checkout-and-portal-button"
                    variant="solid"
                    type="submit"
                  >
                    Call Us
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        {/* TODO: Show payments history */}
      </Stack>
    </div>
  );
}
