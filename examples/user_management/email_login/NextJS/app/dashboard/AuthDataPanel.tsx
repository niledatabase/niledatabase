
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Grid from '@mui/joy/Grid';
import Box from "@mui/joy/Box"
import jwt_decode from "jwt-decode";
import NextLink from 'next/link'
import MUILink from '@mui/joy/Link';
import Server from "@niledatabase/server";

const UNKNOWN = "none";

const nile = Server({
  workspace: String(process.env.NEXT_PUBLIC_WORKSPACE),
  database: String(process.env.NEXT_PUBLIC_DATABASE),
  api: {
    basePath: String(process.env.NEXT_PUBLIC_NILE_API), // note that this page talks to Nile API directly
  },
});

async function getTenantName(userToken: string, tenantId: string):Promise<string> {
  nile.token = userToken;
  nile.tenantId = tenantId;
  // Get tenant name doesn't need any input parameters because it uses the tenant ID from the context
  const resp = await nile.api.tenants.getTenant();
  if (resp.status >= 200 && resp.status < 300) {
    const tenant = await resp.json();
    if (tenant.name) {
      return tenant.name;
    }
  }
  return UNKNOWN;
}

function getTenantId(aud: string[] | string | undefined): string {
  if (Array.isArray(aud)) {
    // audiences that are not 'nile' should be tenant IDs
    // TODO: aud also includes the UUID of the database. We should filter that out too once there's a way to do it.
    const tenantAud = aud.filter(aud => aud !== "nile"); 
    // we'll just show one tenant at random for now
    return tenantAud[0];
  }
  return UNKNOWN;
}

export default async function AuthDataPanel(prop: { token: string }) {
  var decoded:any = {};
  var error = "";
  var tenantId = UNKNOWN;
  var tenantName = UNKNOWN;
  try {
    decoded = jwt_decode(prop.token);
    console.log(decoded);
    tenantId = getTenantId(decoded?.aud);
    tenantName = await getTenantName(prop.token, tenantId);

  } catch (err: any) {
    error = err.message;
    console.log(err);
  }
  


  return (
    <div>
    <Grid container spacing={2}>
      <Grid xs={12} sm={6} md={6}>
        <Stack gap={2} sx={{ maxWidth: '40ch' }}>
          <Typography level="h3">Authentication Data</Typography>

          { error &&
            <Card>
              <CardContent>
                <Typography level="title-lg">Error</Typography>
                <Typography level="body-sm">{error}</Typography>
              </CardContent>
            </Card>
          }

          <Card>
            <CardContent >
              <Typography level="title-lg">Tenant Information</Typography>
              <Typography level="title-sm">Tenant Name</Typography>
              <Typography level="title-sm">{tenantName}</Typography>
              <Typography level="title-sm">Tenant ID</Typography>
              <Typography level="title-sm">{tenantId}</Typography>
            </CardContent >
          </Card>

          <Card>
            <CardContent >
              <Typography level="title-lg">User Information</Typography>
              <Typography level="title-sm">User Identifier</Typography>
              <Typography level="body-sm">{decoded?.sub}</Typography>
              <Typography level="title-sm">Name</Typography>
              <Typography level="body-sm">{decoded?.name}</Typography>
              <Typography level="title-sm">Email Address</Typography>
              <Typography level="body-sm">{decoded?.email}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography level="title-lg">Access Token Information</Typography>
              <Typography level="title-sm">Token Issuer</Typography>
              <Typography level="body-sm">{decoded?.iss}</Typography>
              <Typography level="title-sm">Token Subject (User Identifier)</Typography>
              <Typography level="body-sm">{decoded?.sub}</Typography>
              <Typography level="title-sm">Token Audience</Typography>
              <Typography level="body-sm">{decoded?.aud}</Typography>
              <Typography level="title-sm">Token Expiration</Typography>
              <Typography level="body-sm">{decoded?.exp}</Typography>
              <Typography level="title-sm">Token Issued At</Typography>
              <Typography level="body-sm">{decoded?.iat}</Typography>
              <Typography level="title-sm">Token JWT ID</Typography>
              <Typography level="body-sm">{decoded?.jti}</Typography>
            </CardContent>
          </Card>

        </Stack>
      </Grid>
      <Grid xs={0} sm={6} md={6}>
        <Stack gap={2} sx={{ maxWidth: '40ch' }}>
          <Typography level="h3">Raw Cookie Data</Typography>
          <Card>
            <CardContent>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word"
                }}
              >
                <pre>{JSON.stringify(decoded, null, 2)}</pre>
              </Box>
            </CardContent>
          </Card>
          <Card>            
            <CardContent>
                <MUILink href="/api/logout" overlay sx={{justifyContent: "center"}} component={NextLink}>Logout</MUILink>
            </CardContent></Card>
        </Stack>
      </Grid>
    </Grid>
      
  </div>
  )
}
