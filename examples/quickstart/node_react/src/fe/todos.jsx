import React from "react";
import Table from "@mui/joy/Table";
import Stack from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Checkbox from "@mui/joy/Checkbox";
import { useParams } from "react-router";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet/Sheet";
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';

export default function Todos() {
  const params = useParams();
  const tenantId = params.tenantId;

  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    fetch(`/api/tenants/${tenantId}/todos`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [tenantId]);

  return (
    <div id="todo">
      <Breadcrumbs>
        <Link href="/"> Tenant List </Link>
        <Link href={`/tenants/${tenantId}/todos`}> Tenant {tenantId} </Link>
      </Breadcrumbs>
      <Stack
        direction="column"
        flexWrap="wrap"
        useFlexGap
        sx={{ paddingLeft: "5rem", paddingTop: "5rem" }}
      >
        <Typography level="h1"> Lots to do:</Typography>
        <Sheet sx={{ padding: "0.5rem" }}>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="add-todo"
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
            sx={{ fontWeight: 600, color: "#282c34", bgcolor: "#6FE2FF" }}
          >
            {" "}
            Add Todo
          </Button>
        </Sheet>
        {!data ? (
          <Typography level="h2"> Loading...</Typography>
        ) : (
          <Table
            aria-label="basic table"
            variant="outline"
            size="lg"
            sx={{ padding: "2rem", width: "80%" }}
          >
            <thead>
              <tr>
                <th>Title</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.title}</td>
                  <td>
                    <Chip color={todo.complete ? "success" : "danger"}>
                      {todo.complete ? "yay" : "nope"}
                    </Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ maxWidth: 500 }}
        >
          <Typography id="basic-modal-dialog-title" level="h2">
            New Task
          </Typography>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const title = event.currentTarget.elements[0].value;
              const complete = event.currentTarget.elements[1].checked;
              fetch(`/api/tenants/${tenantId}/todos`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  title: title,
                  complete: complete,
                }),
              })
                .then((resp) => resp.json())
                .then((datum) => {
                  console.log(datum);
                  data.push({
                    title: datum[0].title,
                    id: datum[0].id,
                    complete: datum[0].complete,
                  });
                  setData(data);
                  setOpen(false);
                })
                .catch((error) => {
                  console.error(error);
                  setOpen(false);
                });
            }}
          >
            <Stack spacing={5} direction="column">
              <FormControl sx={{ padding: "0.5rem" }}>
                <FormLabel>Title</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl sx={{ padding: "0.5rem" }}>
                <Checkbox label="Done?" color="success" />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </div>
  );
}
