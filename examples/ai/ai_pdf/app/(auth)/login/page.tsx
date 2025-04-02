import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { FC } from "react";
import { Google } from "@niledatabase/react";

interface pageProps {}

const page: FC<pageProps> = async () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Card className="min-w-sm max-w-md p-5 mt-24">
        <CardHeader className="text-2xl p-0 text-center">Log in</CardHeader>
        <div className="mt-7 items-center flex justify-center flex-col">
          <Google
            className="bg-[#4285f4] p-[3px] pr-3"
            callbackUrl="/dashboard"
          />
        </div>
        <CardFooter className="mt-10 text-sm text-center flex items-center justify-center">
          <h1>
            {" "}
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-indigo-400 hover:underline">
              &nbsp;Sign Up
            </a>
          </h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
