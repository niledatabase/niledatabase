import AuthCookieData from "@/app/model/AuthCookieData";
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { Grid } from "@mui/joy";
import Box from "@mui/joy/Box"

export type AuthDataPanelProps = {
  authData: AuthCookieData;
}

export default function AuthDataPanel(props: AuthDataPanelProps) {
  const { authData } = props;
  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={10} md={6}>
        <Stack gap={2} sx={{ maxWidth: '40ch' }}>
          <Typography level="h3">Authentication Data</Typography>

          { authData.error &&
            <Card>
              <CardContent>
                <Typography level="title-lg">Error</Typography>
                <Typography level="body-sm">{authData.error}</Typography>
              </CardContent>
            </Card>
          }

          <Card>
            <CardContent >
              <Typography level="title-lg">User Information</Typography>
              <Typography level="title-sm">User Identifier</Typography>
              <Typography level="body-sm">{authData.tokenData?.sub}</Typography>
              <Typography level="title-sm">Name</Typography>
              <Typography level="body-sm">{authData.tokenData?.name}</Typography>
              <Typography level="title-sm">Given Name</Typography>
              <Typography level="body-sm">{authData.tokenData?.given_name}</Typography>
              <Typography level="title-sm">Family Name</Typography>
              <Typography level="body-sm">{authData.tokenData?.family_name}</Typography>
              <Typography level="title-sm">Email Address</Typography>
              <Typography level="body-sm">{authData.tokenData?.email}</Typography>
              <Typography level="title-sm">Picture</Typography>
              <Typography level="body-sm">{authData.tokenData?.picture || "none"}</Typography>
              <Typography level="title-sm">Tenant Identifier</Typography>
              <Typography level="body-sm">{authData.tenantId || "none"}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography level="title-lg">Session Information</Typography>
              <Typography level="title-sm">Session Identifier</Typography>
              <Typography level="body-sm">{authData.state}</Typography>
              <Typography level="title-sm">Authentication Event</Typography>
              <Typography level="body-sm">{authData.event}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography level="title-lg">Access Token Information</Typography>
              <Typography level="title-sm">Token Issuer</Typography>
              <Typography level="body-sm">{authData.tokenData?.iss}</Typography>
              <Typography level="title-sm">Token Subject (User Identifier)</Typography>
              <Typography level="body-sm">{authData.tokenData?.sub}</Typography>
              <Typography level="title-sm">Token Audience</Typography>
              <Typography level="body-sm">{authData.tokenData?.aud}</Typography>
              <Typography level="title-sm">Token Expiration</Typography>
              <Typography level="body-sm">{authData.tokenData?.exp}</Typography>
              <Typography level="title-sm">Token Issued At</Typography>
              <Typography level="body-sm">{authData.tokenData?.iat}</Typography>
              <Typography level="title-sm">Token JWT ID</Typography>
              <Typography level="body-sm">{authData.tokenData?.jti}</Typography>
            </CardContent>
          </Card>

        </Stack>
      </Grid>
      <Grid xs={0} sm={2} md={6}>
        <Stack gap={2} sx={{ maxWidth: '40ch' }}>
          <Typography level="h3">Raw Cookie Data</Typography>
          <Card>
            <CardContent>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 700,
                  overflow: "hidden",
                  overflowY: "scroll"
                }}
              >
                <pre>{JSON.stringify(authData, null, 2)}</pre>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  )
}
