import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
  DialogDescription,
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogHeader,
} from "./components/ui/dialog";
import { Plus } from "lucide-react";
import {
  FormControl,
  FormMessage,
  FormItem,
  Form,
  FormField,
  FormDescription,
  FormLabel,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { SignOutButton } from "@niledatabase/react";
import { useForm } from "react-hook-form";

function ExistingTenants({ data }) {
  if (data.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row gap-4 w-full items-center">
        <div className="h-px bg-foreground/30 flex-1"></div>
        or
        <div className="h-px bg-foreground/30 flex-1 "></div>
      </div>
      <div>Use existing tenant</div>
      <div className="flex flex-col gap-2 items-center">
        {data.map((tenant) => {
          return (
            <Link key={tenant.id} to={`/tenants/${tenant.id}/todos`}>
              <Button variant="outline">{tenant.name}</Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default function Tenants() {
  const [tenants, setTenants] = React.useState([]);
  const [me, setMe] = React.useState(null);

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    fetch("/api/tenants")
      .then((res) => res.json())
      .then((data) => setTenants(data));
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => setMe(data));
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 border rounded-lg p-10 m-10">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex flex-row gap-2 items-center">
            <Plus size={14} /> CREATE TENANT
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Add a new tenant</DialogHeader>
          <DialogDescription>Create a tenant for yourself</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                const { name: tenant } = data;
                fetch("/api/tenants", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: tenant,
                  }),
                })
                  .then((resp) => resp.json())
                  .then((datum) => {
                    setTenants((t) => {
                      return [...t, datum];
                    });
                    navigate(`/tenants/${datum.id}/todos`);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })}
              className="flex flex-col gap-2"
            >
              <FormField
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Tenant name</FormLabel>
                      <FormControl>
                        <Input {...field} autoFocus />
                      </FormControl>
                      <FormDescription>
                        The name of the you want to create
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div>
                <Button type="submit">Create tenant</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <ExistingTenants data={tenants} />
      {me ? <div>You are logged in as {me.name ?? me.email}</div> : null}
      <SignOutButton callbackUrl="/" />
    </div>
  );
}
