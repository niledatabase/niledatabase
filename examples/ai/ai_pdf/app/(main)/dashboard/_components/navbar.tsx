import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import UserAccountNav from "@/components/user-account-nav";
import { getNile } from "@/lib/NileServer";
import { redirect } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { User } from "@niledatabase/server";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const Navbar = async () => {
  const nile = await getNile();

  const [userInfo, tenants] = await Promise.all([
    nile.api.users.me as unknown as User,
    nile.api.tenants.listTenants,
  ]);

  if (userInfo instanceof Response || tenants instanceof Response) {
    return redirect("/");
  }

  const email = userInfo.email;
  const picture = userInfo.picture;
  const name = userInfo.name;
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm flex items-center backdrop-blur-lg">
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
