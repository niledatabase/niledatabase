"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { actuallyDeleteUser } from "./action";
import Link from "next/link";
export default function DestroyUser() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<JSX.Element>();
  return (
    <div className="text-center">
      <Button
        // @ts-ignore
        variant="destructive"
        onClick={() => setShowForm(!showForm)}
      >
        Delete the user
      </Button>

      {showForm ? (
        <div className="flex flex-col gap-2 mt-5 mx-auto max-w-96 items-start">
          <div className="rounded-lg bg-destructive text-white p-2">
            This will clean delete the user from the build in tables. It will
            also{" "}
            <strong>remove all oidc logins from the credentials table</strong>,
            which means everyone will need to re-authenticate with the app.
          </div>
          <div>This is for testing purposes only.</div>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <Button
              disabled={!!message}
              onClick={async () => {
                const result = await actuallyDeleteUser(email);
                if (result.ok) {
                  setMessage(
                    <div className="flex flex-col gap-2">
                      Great work, the user was removed from the database. Now
                      you can try again.
                      <Link href="/">
                        {/* @ts-ignore */}
                        <Button variant="link">Go back home</Button>
                      </Link>
                    </div>
                  );
                } else {
                  setMessage(<div>Hm, something bad happened.</div>);
                }
              }}
            >
              Delete user
            </Button>
            <div>{message}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
