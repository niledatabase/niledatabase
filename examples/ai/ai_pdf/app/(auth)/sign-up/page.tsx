import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Google } from '@niledatabase/react';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Card className="min-w-sm mt-24 max-w-md p-5">
          <CardHeader className="p-0 text-center text-2xl">Sign up</CardHeader>
          <div className="mt-7 flex flex-col items-center justify-center">
            <Google />
          </div>
          <CardFooter className="mt-10 flex items-center justify-center text-center text-sm">
            <h1>
              {' '}
              Already have an account?{' '}
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
