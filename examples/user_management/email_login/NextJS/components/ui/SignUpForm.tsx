"use client";

import { useSignUp } from "@niledatabase/react";
// import "@niledatabase/react/styles.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Email,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Password,
} from "@/components/ui/form";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
const queryClient = new QueryClient();

export default function SignUpWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignUp />
    </QueryClientProvider>
  );
}
function SignUp() {
  const [error, setError] = useState("");
  const { toast } = useToast();
  const signIn = useSignUp({
    onSuccess: async (data) => {
      try {
        if (data.ok) {
          const user = await data.json();
          toast({
            title: (
              <div className="flex flex-row gap-2 items-center">
                <CheckCircle className="stroke-green-500" />
                <div>
                  Sign up successful! Go ahead and
                  <Button variant="link" className="pl-1">
                    <Link href="/" className="text-primary">
                      log in as {user.email}
                    </Link>
                  </Button>
                </div>
              </div>
            ),
          });
        } else {
          setError(await data.text());
        }
      } catch (e) {
        console.error(e);
        setError("A request has gone wrong");
      }
    },
  });

  const form = useForm({
    defaultValues: { email: "", password: "", newTenantName: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ email, password, newTenantName }) =>
          signIn({ email, password, newTenantName })
        )}
        className="space-y-8"
      >
        {error ? (
          <div className="bg-destructive rounded-lg p-4 text-white">
            {error}
          </div>
        ) : null}
        <Email />
        <Password />
        <FormField
          control={form.control}
          name="newTenantName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>New tenant</FormLabel>
                <FormControl>
                  <Input placeholder="New tenant name" {...field} />
                </FormControl>
                <FormDescription>
                  The name of the tenant to be created.
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          onClick={() => {
            setError("");
          }}
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
}
