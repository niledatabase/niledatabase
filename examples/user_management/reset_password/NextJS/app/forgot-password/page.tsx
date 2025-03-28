import { PasswordResetRequestForm } from "@niledatabase/react";

export default async function SignIn() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <PasswordResetRequestForm callbackUrl="http://localhost:3000/reset-password" />
    </div>
  );
}
