import * as schema from "~/database/schema";
import { SignOutButton, UserInfo } from "@niledatabase/react";
import { nile } from "~/nile";
import type { Route } from "./+types/profile";
import { database } from "~/database/context";
import GuestBook from "~/welcome/guestbook";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  let name = formData.get("name");
  let email = formData.get("email");
  if (typeof name !== "string" || typeof email !== "string") {
    return { guestBookError: "Name and email are required" };
  }

  name = name.trim();
  email = email.trim();
  if (!name || !email) {
    return { guestBookError: "Name and email are required" };
  }

  const db = database();
  try {
    await db.insert(schema.guestBook).values({ name, email });
  } catch (error) {
    console.log(error);
    return { guestBookError: "Error adding to guest book" };
  }
}
export async function loader({ context, request }: Route.LoaderArgs) {
  const user = await nile.api.users.me(request.headers);
  if (user instanceof Response) {
    return { message: await user.text() };
  }

  const db = database();

  const guestBook = await db.query.guestBook.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  return {
    user,
    guestBook,
  };
}

export default function Profile({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { user, message } = loaderData;
  return (
    <div className="container mx-auto flex flex-col items-center pt-20 gap-20 relative">
      <div>{message ? <>{message}</> : null}</div>
      <SignOutButton callbackUrl="/" className="absolute right-0 top-20" />
      <UserInfo user={user} className="w-[400px]" />
      <GuestBook
        guestBook={loaderData.guestBook ?? []}
        guestBookError={actionData?.guestBookError}
        message={loaderData.message}
      />
    </div>
  );
}
