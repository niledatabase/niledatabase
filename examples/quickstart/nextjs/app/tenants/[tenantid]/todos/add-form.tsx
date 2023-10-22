'use client'

import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Input from '@mui/joy/Input';
import ListItermDecorator from '@mui/joy/ListItemDecorator';
import Box from '@mui/joy/Box';
// @ts-expect-error -- useFormState is new and lacks type definitions
import { experimental_useFormState as useFormState } from 'react-dom'
import { addTodo } from './todo-actions';

const initialState = {
  message: null,
}

export function AddForm() {
  const [state, formAction] = useFormState(addTodo, initialState)

  return (
    <form name="newtodo" id="newtodo" action={formAction} style={{display:'flex', flexWrap:'nowrap', width:'100%'}}>
      <IconButton type="submit"> <Add /> </IconButton>
      <Input placeholder="Add task" variant="outlined" id="todo" name="todo" sx={{width:'80%'}}></Input>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}