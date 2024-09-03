import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";
import { useTranscriptHandler } from '../hooks/useTranscriptHandler';
import { useTranscripts } from '../hooks/useTranscripts';

// MUI joy components
import Box from "@mui/joy/Box";
import Grid from "@mui/joy/Grid";
import { Typography } from "@mui/joy";
import MUILink from "@mui/joy/Link";

import { TranscriptItem } from "../types/types";
import Layout from "../layout";
import ContentViewer from "../components/ContentViewer";
import Sidebar from "../components/Sidebar";
import Chatbox from "../components/Chatbox";


// TODO: Right now, this is set to select one sales conversation and chat with it. Do we want to have a chat with *all* conversations in the tenant?
export default function Chat() {
    const params = useParams();
    const navigate = useNavigate();
    const tenantId = params.tenantId;
    if (!tenantId) {
        React.useEffect(() => {
            navigate('/tenants');
        }, []);
        return null; // Render nothing while redirecting
    }

    const [tenantName, setTenantName] = React.useState(null);
    const transcripts = useTranscripts(tenantId);

    const { transcriptContent, selectedTranscript, handleTranscriptClick } = useTranscriptHandler(tenantId);

    // get tenant name for title
    React.useEffect(() => {
        fetch(`/api/tenants/${tenantId}`)
            .then(res => {
                if (res.status >= 200 && res.status <= 399) {
                    return res.json();
                } else {
                    // if we can't get tenant name, we are likely logged out
                    console.log("failed to get tenant name, redirecting for re-login " + res.status + " " + res.statusText);
                    throw new Error('Failed to fetch tenant name');
                }
            })
            .then(data => {
                setTenantName(data.name);
            })
            .catch(() => {
                navigate('/');
            });
    }, [tenantId, navigate]);

    return (
        <Layout>
        <Box sx={{ padding: 4, width: "100%" }}>
          <Grid container spacing={2} sx={{ height: "70vh" }}>
            <Grid xs={2}>
              <Typography level="body-md">
                Current tenant: {tenantName}
              </Typography>
            </Grid>
            <Grid xs={10}>
            <MUILink
                component={ReactLink}
                to="/tenants"
                justifyContent={"center"}
            >
                (Back to tenant selection){" "}
            </MUILink>
            </Grid>
            <Grid md={2} sx={{ overflow: "auto", height: "65vh" }}>
              <Sidebar
                items={transcripts}
                onClick={handleTranscriptClick}
                selectedItems={selectedTranscript}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <ContentViewer content={transcriptContent} />
            </Grid>
            <Grid xs={12} md={6}>
                {/* TODO: pass in currently selected file */}
              <Chatbox
                tenantid = {tenantId}
              />
            </Grid>
          </Grid>
        </Box>
        </Layout>
      );
}