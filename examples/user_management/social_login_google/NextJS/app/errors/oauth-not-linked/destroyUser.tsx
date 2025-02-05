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
      <Button variant="destructive" onClick={() => setShowForm(!showForm)}>
        Delete the user
      </Button>

      {showForm ? (
        <div className="flex flex-col gap-2 mt-5 mx-auto max-w-96 items-start">
          <div>{message}</div>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <Button
              onClick={async () => {
                const result = await actuallyDeleteUser(email);
                if (result.ok) {
                  setMessage(
                    <div>
                      Great work, the user was removed from the database. Now
                      you can try again.
                      <Link href="/">
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
          </div>
        </div>
      ) : null}
    </div>
  );
}
