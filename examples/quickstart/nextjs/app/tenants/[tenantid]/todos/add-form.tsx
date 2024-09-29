"use client";

import IconButton from "@mui/joy/IconButton";
import Add from "@mui/icons-material/Add";
import Input from "@mui/joy/Input";
import Snackbar from "@mui/joy/Snackbar";
import Alert from "@mui/joy/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ListItermDecorator from "@mui/joy/ListItemDecorator";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
// @ts-expect-error -- useFormState is new and lacks type definitions
import { experimental_useFormState as useFormState } from "react-dom";
import { addTodo } from "./todo-actions";
import { useState, useEffect } from "react";

const initialState = {
  message: null,
};

export function AddForm({ tenantid }: { tenantid: string }) {
  const addTodoWithTenant = addTodo.bind(null, tenantid);
  const [state, formAction] = useFormState(addTodoWithTenant, initialState);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  useEffect(() => {
    if (state.message !== null) {
      setIsSnackbarOpen(true);
    }
  }, [state.message]);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <form
      name="newtodo"
      id="newtodo"
      action={formAction}
      style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}
    >
      <IconButton type="submit">
        {" "}
        <Add />{" "}
      </IconButton>
      <Input
        placeholder="Add task"
        variant="outlined"
        id="todo"
        name="todo"
        sx={{ width: "95%" }}
      ></Input>
      <br />
      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={30000}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {Object.entries(state).map(([key, value]) => (
            <Typography key={key} level="body-md" textAlign="left">
              {key}: {String(value)}
            </Typography>
          ))}
        </Box>
      </Snackbar>
    </form>
  );
}
