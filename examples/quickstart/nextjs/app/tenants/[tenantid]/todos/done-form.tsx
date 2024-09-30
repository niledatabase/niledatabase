"use client";
import Checkbox from "@mui/joy/Checkbox";
import Typography from "@mui/joy/Typography";
import { useTransition } from "react";
import { completeTodo } from "./todo-actions";

export function DoneForm({
  tenantId,
  todo,
}: {
  tenantId: string;
  todo: { id: string; title: string; complete: boolean };
}) {
  const [, startTransition] = useTransition();
  return (
    <Checkbox
      label={<Typography>{todo.title}</Typography>}
      checked={todo.complete}
      onChange={() =>
        startTransition(() => {
          completeTodo(tenantId, todo.id, !todo.complete);
        })
      }
    />
  );
}
