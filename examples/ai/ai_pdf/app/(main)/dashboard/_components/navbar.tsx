import { Logo } from '@/components/logo';
import { ModeToggle } from '@/components/mode-toggle';
import UserAccountNav from '@/components/user-account-nav';
import { nile } from '@/lib/NileServer';
import { redirect } from 'next/navigation';
import { MobileSidebar } from './mobile-sidebar';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export const Navbar = async () => {
  const [userInfo, tenants] = await Promise.all([
    nile.users.getSelf(),
    nile.tenants.list(),
  ]);

  if (userInfo instanceof Response || tenants instanceof Response) {
    return redirect('/');
  }

  const email = userInfo.email;
  const picture = userInfo.picture;
  const name = userInfo.name;
  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b px-4 shadow-sm backdrop-blur-lg">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        {/* <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm hidden md:block h-auto  py-1.5 px-2"
          >
            Create Board
          </Button>
        </FormPopover>
        <FormPopover>
          <Button
            variant="primary"
            size="sm"
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" /> Board
          </Button>
        </FormPopover> */}
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        {/* <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          afterSelectOrganizationUrl="/organization/:id"
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        /> */}
        {/* <OrgSelector orgs={tenants} /> */}
        <a href="/dashboard">Dashboard</a>
        <ModeToggle />
        <UserAccountNav email={email} imageUrl={picture} name={name} />
      </div>
    </nav>
  );
};
