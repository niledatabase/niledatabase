import inspectDirectory from '../PageContent/inspectDirectory';
import { RenderItems } from './RenderItems';

export default async function SideNavigation({ page }: { page: string }) {
  const navBar = await inspectDirectory();
  return (
    <>
      <aside
        aria-label="Sidenav"
        className="whitespace-nowrap hidden lg:flex sticky top-[62px] sidenav pb-5 shrink-0"
      >
        <ul className="p-4 pl-2 w-[280px] overflow-y-scroll">
          <RenderItems items={navBar} page={page} />
        </ul>
      </aside>
    </>
  );
}

export async function generateStaticParams() {
  return await inspectDirectory();
}
