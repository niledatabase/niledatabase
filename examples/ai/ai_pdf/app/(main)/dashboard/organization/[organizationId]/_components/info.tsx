'use client';

import { Building, CreditCard } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

interface InfoProps {
  name?: string | undefined;
}

export const Info = ({ name }: InfoProps) => {
  //   if (!isLoaded) {
  //     return (
  //       <Info.Skeleton />
  //     );
  //   }

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        {/* <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        /> */}
        <Building className="h-16 w-16" />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-semibold">{name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="mr-1 h-3 w-3" />
          Free
          {/* {isPro ? "Pro" : "Free"} */}
        </div>
      </div>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px]">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="mr-2 h-4 w-4" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
