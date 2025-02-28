import { Button } from "@/components/ui/button";
import DestroyUser from "./destroyUser";
import Link from "next/link";

export default function OauthNotLinked() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 mt-9">
        <div className="text-2xl">Something went wrong.</div>
        <div>
          You have selected a provider, but you have previously logged into the
          app with a different one. You can:
        </div>
        <div className="text-center text-lg">
          <Link href="/">
            <Button>Go back and select a different provider</Button>
          </Link>
        </div>
        <div className="flex flex-row mx-auto items-center gap-3 w-1/2">
          <div className="h-px bg-slate-400 flex-1" />
          or
          <div className="h-px bg-slate-400 flex-1" />
        </div>
        <DestroyUser />
      </div>
    </div>
  );
}
