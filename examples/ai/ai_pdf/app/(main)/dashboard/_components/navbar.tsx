import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import UserAccountNav from "@/components/user-account-nav";
import { configureNile } from "@/lib/NileServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const Navbar = async () => {
  const nile = configureNile(cookies().get("authData"), null);
  if (!nile.userId) {
    redirect("/");
  }
  let tenants: any = [];
  if (nile.userId) {
    // TODO: Replace with API call to get tenants for user when the SDK supports this
    const res = await nile.db.query(
      `select id, name from tenants join users.tenant_users on tenants.id = tenant_users.tenant_id
      where tenant_users.user_id = $1`,
      [nile.userId]
    );
    tenants = res.rows;
  }
  const userInfo = await nile.db.query(
    "select * from users.users where id=$1",
    [nile.userId]
  );
  console.log(userInfo);
  const email = userInfo.rows[0].email;
  const picture = userInfo.rows[0].picture;
  const name = userInfo.rows[0].name;
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
