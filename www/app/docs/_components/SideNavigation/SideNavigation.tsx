import inspectDirectory from "../PageContent/inspectDirectory";
import { RenderItems } from "./RenderItems";

export default async function SideNavigation({ page }: { page: string }) {
  const navBar = await inspectDirectory();
  return (
    <>
      <aside
        aria-label="Sidenav"
        className="whitespace-nowrap hidden lg:flex sticky top-[62px] sidenav pb-5 shrink-0 overflow-y-scroll"
      >
        <div className="relative">
          <div className="absolute top-0 bottom-0 w-[1px] bg-border h-full right-[0px] hidden lg:block -z-10"></div>
          <ul className="p-4 pl-2 w-[280px]">
            <RenderItems items={navBar} page={page} />
          </ul>
        </div>
      </aside>
    </>
  );
}

export async function generateStaticParams() {
  return await inspectDirectory();
}
