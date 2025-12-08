'use client';

import { Layout, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export type Organization = {
  id: string;
  name: string;
};

interface NavItemProps {
  organizationId: string;
}

export const NavItem = ({
  // isExpanded,
  // isActive,
  organizationId,
}: // onExpand,
NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: 'Files',
      icon: <Layout className="mr-2 h-4 w-4" />,
      href: `/dashboard/organization/${organizationId}`,
    },
    {
      label: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/dashboard/organization/${organizationId}/settings`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      {routes.map((route) => (
        <Button
          key={route.href}
          size="sm"
          onClick={() => onClick(route.href)}
          className={cn(
            'mb-1 w-full justify-start pl-10 font-normal',
            pathname === route.href &&
              'bg-sky-500/10 text-sky-700 dark:text-indigo-300',
          )}
          variant="ghost"
        >
          {route.icon}
          {route.label}
        </Button>
      ))}
    </>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative h-10 w-10 shrink-0">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
