import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { FC } from 'react';
import { Google } from '@niledatabase/react';

interface pageProps {}

const page: FC<pageProps> = async () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Card className="min-w-sm mt-24 max-w-md p-5">
        <CardHeader className="p-0 text-center text-2xl">Log in</CardHeader>
        <div className="mt-7 flex flex-col items-center justify-center">
          <Google
            className="bg-[#4285f4] p-[3px] pr-3"
            callbackUrl="/dashboard"
          />
        </div>
        <CardFooter className="mt-10 flex items-center justify-center text-center text-sm">
          <h1>
            {' '}
            Don&apos;t have an account?{' '}
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
