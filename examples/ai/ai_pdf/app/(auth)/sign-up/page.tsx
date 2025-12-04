import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Google } from "@niledatabase/react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex w-full justify-center items-center">
        <Card className="min-w-sm max-w-md p-5 mt-24">
          <CardHeader className="text-2xl p-0 text-center">Sign up</CardHeader>
          <div className="mt-7 items-center flex justify-center flex-col">
            <Google />
          </div>
          <CardFooter className="mt-10 text-sm text-center flex items-center justify-center">
            <h1>
              {" "}
              Already have an account?{" "}
              <a href="/login" className="text-indigo-400 hover:underline">
                &nbsp;Login
              </a>
            </h1>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default page;
