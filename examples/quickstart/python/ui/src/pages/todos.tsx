import React from "react";
import Stack from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Add from "@mui/icons-material/Add";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import ListDivider from "@mui/joy/ListDivider";
import Checkbox from "@mui/joy/Checkbox";
import { useParams } from "react-router";
import {Link as ReactLink} from 'react-router-dom'
import MUILink from '@mui/joy/Link';
import Layout from "../layout";

interface Todo {
  id: string;
  title: string;
  complete: boolean;
}

export default function Todos() {
  const params = useParams();
  const tenantId = params.tenantId;

  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [tenantName, setTenantName] = React.useState(null); 

  const headers: HeadersInit = new Headers();
  headers.set('X-Tenant-Id', tenantId || '');
  headers.set('Content-Type', 'application/json');
  
  React.useEffect(() => {
    fetch(`/api/todos`, {
      method: 'GET',
      headers: headers
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [tenantId]);

  React.useEffect(() => {
    fetch(`/api/tenants/${tenantId}`)
      .then((res) => res.json())
      .then((data) => setTenantName(data.name));
  }, [tenantId]);

  return (
    <Layout>
      <Stack>
      <Typography level="h2" textAlign={"center"} sx={{textTransform: 'uppercase', margin: "10px"}}>{tenantName}'s Todos</Typography>
      <div style={{justifyContent: "center", display:"flex", margin:"10px"}}>
      <MUILink component={ReactLink} to="/tenants" justifyContent={"center"}>(Back to tenant selection) </MUILink>
      </div>
      <List variant="plain" size="lg">
      <ListItem>
          <form name="newtodo" id="newtodo" onSubmit={(event) => {
            event.preventDefault();
            const title = (event.currentTarget.elements[1] as HTMLInputElement).value; // first element is the button
            handleAdd(title);
          }} style={{display:'flex', flexWrap:'nowrap', width:'100%'}}>
            <IconButton type="submit"> <Add /> </IconButton>
            <Input placeholder="Add task" variant="outlined" id="todo" name="todo" sx={{width:'80%'}}></Input>
          </form>
        </ListItem>
        <ListDivider />
        { (() => {
            if (!todos) {
              return <Typography level="h2" textAlign={"center"}> Loading...</Typography>
            } else {
            return todos.map((todo) => (
              <div key={todo.id} style={{display: 'flex', flexWrap:'nowrap', padding: '0.5rem'}}>
              <ListItem key={todo.id}>
              <Checkbox 
                  label={<Typography>{todo.title}</Typography>}
                  checked={todo.complete} 
                  onChange={() => completeTodo(tenantId, todo)}/>
              </ListItem>
              <ListDivider />
            </div>
          ))}})()}
        </List>
      </Stack>
      </Layout>
  );

  function handleAdd (title: string) {
    fetch(`/api/todos`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        title: title,
        complete: false, // new todos are always incomplete
      }),
    })
      .then((resp) => resp.json())
      .then((datum) => {
        console.log(datum);
        var curr_state = todos.slice(); // need to copy so React will notice state change
        curr_state.push({
          title: datum.title,
          id: datum.id,
          complete: datum.complete,
        });
        setTodos(curr_state);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function completeTodo(tenantId: string | undefined, todo: Todo) {
    const newComplete = !todo.complete;
    if (!tenantId) {
      console.error("No tenantId");
      return;
    }
    fetch(`/api/tenants/${tenantId}/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: todo.id,
        complete: newComplete,
      }),
    })
      .then((resp) => {
        console.log(resp);
        if (resp.status !== 200) {
          throw new Error("Error: " + resp.statusText + " " + resp.status);
        }
        var curr_state = todos.slice(); // need to copy so React will notice state change
        if (curr_state) {
          let curr_todo = curr_state.find((t) => t.id === todo.id)
          if (curr_todo) {
            curr_todo.complete = newComplete;
          }
        }
        setTodos(curr_state);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
