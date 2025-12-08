import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className={cn('flex flex-col items-center justify-center')}>
        <h1 className="font-switzerBold mb-6 text-center text-3xl md:text-6xl">
          PDF search assistant for your organization
        </h1>
        <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          'font-switzerRegular mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
        )}
      >
        Every Resource you need in one place
      </div>
      <Button size="sm" asChild className="mt-5">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
