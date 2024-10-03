"use client";

import IconButton from "@mui/joy/IconButton";
import Add from "@mui/icons-material/Add";
import Input from "@mui/joy/Input";
import Snackbar from "@mui/joy/Snackbar";
import Alert from "@mui/joy/Alert";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { useState, useEffect, useCallback, useRef } from "react";
import { addTodo } from "./todo-actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export function AddForm({ tenantid }: { tenantid: string }) {
  const addTodoWithTenant = addTodo.bind(null, tenantid);
  const [state, formAction] = useFormState(addTodoWithTenant, initialState);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSnackbarClose = useCallback(() => {
    setSnackbarMessage(null);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      formAction(formData);
      if (formRef.current) formRef.current.reset();
    },
    [formAction]
  );

  useEffect(() => {
    if (state.message !== null) {
      setSnackbarMessage(JSON.stringify(state));
    }
  }, [state]);

  return (
    <form
      name="newtodo"
      id="newtodo"
      action={formAction}
      style={{ display: "flex", flexWrap: "nowrap", width: "100%" }}
    >
      <IconButton type="submit">
        <Add />
      </IconButton>
      <Input
        placeholder="Add task"
        variant="outlined"
        id="todo"
        name="todo"
        sx={{ width: "95%" }}
      ></Input>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
