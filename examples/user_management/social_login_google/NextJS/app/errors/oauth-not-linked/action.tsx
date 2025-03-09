"use server";

import { nile } from "@/app/api/[...nile]/nile";

// :rip:
export async function actuallyDeleteUser(email: string) {
  const user = await nile.db.query(
    "select * from users.users where email = $1",
    [email]
  );

  await nile.db.query("delete from auth.credentials where user_id = $1", [
    user.rows[0].id,
  ]);

  await nile.db.query(
    "delete from auth.credentials where payload->>'email' = $1",
    [user.rows[0].email]
  );

  await nile.db.query(
    "delete from auth.credentials where method != 'EMAIL_PASSWORD'"
  );

  await nile.db.query("delete from auth.sessions where user_id = $1", [
    user.rows[0].id,
  ]);

  await nile.db.query("delete from users.users where id = $1", [
    user.rows[0].id,
  ]);

  return { ok: true };
}
