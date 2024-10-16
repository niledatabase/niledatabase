"use client";
import { useFormState } from "react-dom";
import { useState } from "react";
import { createTenant } from "@/app/tenants/tenant-actions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState = {
  message: "",
};

export function AddForm() {
  const [state, formAction] = useFormState(createTenant, initialState);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
          Create tenant
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create tenant</DialogTitle>

          <form name="newtenant" id="newtenant" action={formAction}>
            <div className="flex flex-col gap-6">
              <label htmlFor="tenantname">Name</label>
              <Input id="tenantname" name="tenantname" autoFocus required />
              <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
              </p>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
