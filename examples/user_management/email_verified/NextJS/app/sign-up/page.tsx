import { Button } from "@/components/ui/button";
import { SignUpForm } from "@niledatabase/react";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="container mx-auto p-12 pt-20 gap-8 flex flex-col items-center">
      <SignUpForm />
      <div className="text-sm">
        Already a user?{" "}
        <Link href="/" className="hover:underline">
          <Button variant="link" className="pl-0 text-primary">
            Log in here
          </Button>
        </Link>
      </div>
    </div>
  );
}
