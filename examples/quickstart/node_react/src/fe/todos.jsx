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


export default function Todos() {
  const params = useParams();
  const tenantId = params.tenantId;

  const [todos, setTodos] = React.useState(null);
  const [tenantName, setTenantName] = React.useState(null); 
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    fetch(`/api/tenants/${tenantId}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [tenantId]);

  React.useEffect(() => {
    fetch(`/api/tenants/${tenantId}`)
      .then((res) => res.json())
      .then((data) => setTenantName(data.name));
  }, [tenantId]);

  return (
      <Stack spacing={2} mt={2} sx={{minWidth:"50%",backgroundColor:'white'}}>
      <Typography level="h2" textAlign={"center"} sx={{textTransform: 'uppercase', margin: "10px"}}>{tenantName}'s Todos</Typography>
      <div style={{justifyContent: "center", display:"flex", margin:"10px"}}>
      <MUILink component={ReactLink} to="/tenants" justifyContent={"center"}>(Back to tenant selection) </MUILink>
      </div>
      <List variant="plain" size="lg">
      <ListItem>
          <form name="newtodo" id="newtodo" onSubmit={(event) => {
            event.preventDefault();
            const title = event.currentTarget.elements[1].value; // first element is the button
            handleAdd(title);
          }} style={{display:'flex', flexWrap:'nowrap', width:'100%'}}>
            <IconButton type="submit"> <Add /> </IconButton>
            <Input placeholder="Add task" variant="outlined" id="todo" name="todo" sx={{width:'80%'}}></Input>
          </form>
        </ListItem>
        <ListDivider />
        {!todos 
          ? <Typography level="h2"> Loading...</Typography>
          : todos.map((todo) => (
                <div key={todo.title} style={{display: 'flex', flexWrap:'nowrap', padding: '0.5rem'}}>
                {/* TODO: todos need IDs */}
                <ListItem key={todo.title}>
                <Checkbox 
                    label={<Typography>{todo.title}</Typography>}
                    checked={todo.complete} 
                    onChange={() => startTransition(
                      () => completeTodo(tenantId, todo.title, !todo.complete)
                    )}/>
                </ListItem>
                <ListDivider />
              </div>
            ))}
        </List>
      </Stack>
  );

  function handleAdd (title) {
    fetch(`/api/tenants/${tenantId}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
          title: datum[0].title,
          id: datum[0].id,
          complete: datum[0].complete,
        });
        setTodos(curr_state);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function completeTodo(tenantId, title, complete) {
    //TBD
  }
}
