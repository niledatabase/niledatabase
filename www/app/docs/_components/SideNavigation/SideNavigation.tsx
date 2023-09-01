import inspectDirectory from "../PageContent/inspectDirectory";
import { RenderItems } from "./RenderItems";

export default async function SideNavigation({ page }: { page: string }) {
  const navBar = await inspectDirectory();
  return (
    <>
      <aside
        aria-label="Sidenav"
        className="whitespace-nowrap hidden lg:flex pl-3 sticky top-[71px] h-full"
      >
        <ul className="p-4 pl-2">
          <RenderItems items={navBar} page={page} />
        </ul>
      </aside>
    </>
  );
}

export async function generateStaticParams() {
  return await inspectDirectory();
}
