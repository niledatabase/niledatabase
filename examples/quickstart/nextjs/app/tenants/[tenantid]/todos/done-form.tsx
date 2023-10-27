'use client'
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import { useTransition } from 'react';
import { completeTodo } from './todo-actions';

const initialState = {
  message: null,
}

export function DoneForm({ tenantId, title, complete }: { tenantId: string, title: string, complete: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
        <Checkbox
          label={<Typography>{title}</Typography>}
          checked={complete}
          onChange={() => startTransition(
            () => { completeTodo(tenantId, title, !complete) }
        )}/>
  )
}