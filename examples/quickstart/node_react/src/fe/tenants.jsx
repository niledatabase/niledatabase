import React from "react";
import styles from "./css/page.module.css";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import ModalDialog from "@mui/joy/ModalDialog";
import Modal from "@mui/joy/Modal";
import Add from "@mui/icons-material/Add";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function getUserName() {
  const raw = Cookies.get("authData");
  const authData = raw ? JSON.parse(decodeURIComponent(raw)) : null;
  if (authData) {
    const bestName =
      authData.tokenData?.name ||
      authData.tokenData?.email ||
      authData.tokenData?.given_name ||
      authData.tokenData?.family_name;
    return bestName;
  } else {
    return null;
  }
}

function Tenants() {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("/api/tenants")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  React.useEffect(() => {
    setUserName(getUserName());
  }, []);

  return (
    <div className={styles.center}>
      <Card variant="outlined">
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label="add-tenant"
                startDecorator={<Add />}
                onClick={() => setOpen(true)}
                sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
              >
                CREATE TENANT
              </Button>
            </div>
          </div>
        </CardContent>
        <Divider>or</Divider>
        <CardContent>
          <Typography level="title-md" textAlign="center" padding={2}>
            Use Existing Tenant
          </Typography>
          <List variant="outlined">
            {(() => {
              if (!data) {
                return (
                  <Typography level="h2" textAlign={"center"}>
                    {" "}
                    Loading...
                  </Typography>
                );
              } else if (!Array.isArray(data)) {
                return (
                  <Typography level="h2" textAlign={"center"}>
                    {" "}
                    Error: {data.message}
                  </Typography>
                );
              } else {
                return data.map((tenant) => (
                  <ListItem key={tenant.id}>
                    <ListItemButton
                      component={Link}
                      to={`/tenants/${tenant.id}/todos`}
                    >
                      {tenant.name}
                    </ListItemButton>
                  </ListItem>
                ));
              }
            })()}
          </List>
        </CardContent>
        <CardContent>
          <Typography level="body-md" textAlign="center">
            {" "}
            You are logged in as {userName}{" "}
          </Typography>
        </CardContent>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" level="h2">
            Name
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const tenant = event.currentTarget.elements[0].value;
              fetch("/api/tenants", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: tenant,
                }),
              })
                .then((resp) => resp.json())
                .then((datum) => {
                  console.log(datum);
                  data.push({ name: tenant, id: datum.id });
                  setData(data);
                  setOpen(false);
                  navigate(`/tenants/${datum.id}/todos`);
                })
                .catch((error) => {
                  console.error(error);
                  setOpen(false);
                });
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <Input autoFocus required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}

export default Tenants;
