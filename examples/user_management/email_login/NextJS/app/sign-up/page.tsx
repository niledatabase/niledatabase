import { Button } from "@/components/ui/button";
import SignUp from "@/components/ui/SignUpForm";
import { Toaster } from "@/components/ui/toast";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl mt-24">Sign up</h2>
      <SignUp />
      <p>
        Already a user?{" "}
        <Button variant="link" className="pl-0">
          <Link href="/">Sign in here</Link>
        </Button>
      </p>
      <Toaster />
    </div>
  );
}
