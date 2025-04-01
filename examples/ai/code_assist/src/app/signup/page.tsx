import { Button } from "@/components/ui/button";
import Form from "./Form";
import Link from "next/link";

// very simple sign up page, it uses a wrapper component around Nile's React components
export default function SignUpPage() {
  return (
    <div className="container mx-auto ">
      <div className="w-2xl mx-auto flex flex-col gap-5">
        <Form />
        <div className="text-sm flex flex-row gap-2 items-center mx-auto">
          <div>Already a user?</div>
          <Link href="/">
            <Button variant="link" className="pl-0">
              Sign in here
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
