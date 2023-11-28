import inspectDirectory from "../PageContent/inspectDirectory";
import MobileSidenav from "./MobileSidenav";
import { RenderItems } from "./RenderItems";
import SearchBox from "./Search";

export default async function SideNavigation({ page }: { page: string }) {
  const navBar = await inspectDirectory();
  return (
    <div className="shrink-0">
      <aside
        aria-label="Sidenav"
        className="whitespace-nowrap z-10 hidden xl:flex xl:sticky top-[62px] sidenav pb-5 overflow-y-scroll"
      >
        <div className="relative">
          <div className="absolute top-0 bottom-0 w-[1px] bg-border h-full right-[0px] hidden lg:block -z-10"></div>
          <SearchBox />
          <ul className="p-4 pl-2 w-[280px]">
            <RenderItems items={navBar} page={page} />
          </ul>
        </div>
      </aside>
      <MobileSidenav navBar={navBar} page={page} />
    </div>
  );
}

export async function generateStaticParams() {
  return await inspectDirectory();
}
