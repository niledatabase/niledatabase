"use client";
import { useEffect, useCallback, useRef } from "react";
import { addTodo } from "./todo-actions";
//@ts-expect-error
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";

const initialState = {
  message: "",
};

export function AddForm({ tenantid }: { tenantid: string }) {
  const addTodoWithTenant = addTodo.bind(null, tenantid);
  const [state, formAction] = useFormState(addTodoWithTenant, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

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
      const msg = Object.entries(state)
        .map(([key, value]) => {
          return `${key}:${value}`;
        })
        .filter(Boolean);
      toast({
        title: (
          <div className="flex flex-col gap-3">
            {msg.map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        ),
      });
    }
  }, [state, toast]);

  return (
    <>
      <form
        ref={formRef}
        name="newtodo"
        id="newtodo"
        onSubmit={handleSubmit}
        className="flex flex-row gap-2"
      >
        <Button type="submit">
          <Plus />
        </Button>
        <Input placeholder="Add task" id="todo" name="todo" />
      </form>
    </>
  );
}
