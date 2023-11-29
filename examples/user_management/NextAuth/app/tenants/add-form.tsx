'use client'
// @ts-expect-error -- useFormState is new and lacks type definitions
import { experimental_useFormState as useFormState } from 'react-dom'
import { useState } from 'react'
import Button from '@mui/joy/Button'
import Typography from '@mui/joy/Typography'
import ModalDialog from "@mui/joy/ModalDialog";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import styles from '../page.module.css';
import { createTenant } from '@/app/tenants/tenant-actions'
// ^^^ the actual actions are in a server component because they are database operations



const initialState = {
  message: null,
}

export function AddForm() {
  const [state, formAction] = useFormState(createTenant, initialState)
  const [open, setOpen] = useState(false);

  return (
    <div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="add-tenant"
          onClick={() => setOpen(true)}
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
        >
          CREATE TENANT
        </Button>
    <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{ maxWidth: 500 }}
          >
        <form name="newtenant" id="newtenant" action={formAction}> 
        <Stack spacing={3}>
                <Typography>Name</Typography>
                <Input id="tenantname" name="tenantname" autoFocus required />
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
                <Button type="submit" variant="solid">Submit</Button>
        </Stack>
        </form>

        </ModalDialog>
        </Modal>
    </div>
  )
}