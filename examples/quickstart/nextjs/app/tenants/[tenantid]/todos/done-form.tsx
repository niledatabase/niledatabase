'use client';
import { useTransition } from 'react';
import { completeTodo } from './todo-actions';
import { Checkbox } from '@/components/ui/checkbox';

export function DoneForm({
  tenantId,
  todo,
}: {
  tenantId: string;
  todo: { id: string; title: string; complete: boolean };
}) {
  const [, startTransition] = useTransition();
  return (
    <div className="flex flex-row items-center gap-4">
      <Checkbox
        checked={todo.complete}
        onCheckedChange={() =>
          startTransition(() => {
            completeTodo(tenantId, todo.id, !todo.complete);
          })
        }
      />
      <div>{todo.title}</div>
    </div>
  );
}
