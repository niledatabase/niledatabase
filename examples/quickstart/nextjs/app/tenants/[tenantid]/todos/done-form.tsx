'use client'
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import { useTransition } from 'react';
// @ts-expect-error -- useFormState is new and lacks type definitions
import { experimental_useFormState as useFormState } from 'react-dom'
import { completeTodo } from './todo-actions';

const initialState = {
  message: null,
}

export function DoneForm({ tenantid, title, complete }: { tenantid: string, title: string, complete: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
        <Checkbox 
          label={<Typography>{title}</Typography>}
          checked={complete} 
          onChange={() => startTransition(
            () => completeTodo(tenantid, title, !complete)
        )}/>
  )
}