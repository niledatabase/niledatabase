'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { NavItem, Organization } from './nav-item';
import { useParams } from 'next/navigation';

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  const params = useParams();
  console.log(params.organizationId);
  const id = params.organizationId as string;
  // const {
  //   organization: activeOrganization,
  //   isLoaded: isLoadedOrg
  // } = useOrganization();
  // const {
  //   userMemberships,
  //   isLoaded: isLoadedOrgList
  // } = useOrganizationList({
  //   userMemberships: {
  //     infinite: true,
  //   },
  // });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    [],
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  // if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //   return (
  //     <>
  //       <div className="flex items-center justify-between mb-2">
  //         <Skeleton className="h-10 w-[50%]" />
  //         <Skeleton className="h-10 w-10" />
  //       </div>
  //       <div className="space-y-2">
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //         <NavItem.Skeleton />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      {/* <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/organization">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div> */}
      {/* <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      > */}
      {/* {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))} */}
      {/* <NavItem key={id} organizationId={id} /> */}
      {/* </Accordion> */}
      {/* <Link href={`/dashboard/organization/${params.organizationId}/settings`}>
        // settings 
      </Link> */}
      <NavItem key={id} organizationId={id} />
    </>
  );
};
