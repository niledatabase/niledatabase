import Link from "next/link";
import inspectDirectory from "../PageContent/inspectDirectory";

function BaseListItem({ item, page }: { item: any; page: string }) {
  let href = `/${item.slug?.join("/").replace(/\/?(index)?\.mdx/, "")}`;
  const itemClasses = ["active:font-bold"];
  if (page === href || page === `${href}`) {
    itemClasses.push("font-bold");
  }
  return (
    <li key={item.header} className={itemClasses.join(" ")}>
      <Link href={href}>{item.header}</Link>
    </li>
  );
}
function renderItems(items: any, page: string) {
  return items.map((item: any) => {
    if (Array.isArray(item)) {
      const [itm] = item;
      if (itm.items) {
        return renderItems(itm.items, page);
      }
    }

    if (!item.items) {
      return <BaseListItem key={item.header} item={item} page={page} />;
    }
    const indexed = item.items.find((item: any) => item.name === "index.mdx");
    const remaining = item.items.filter(
      (item: any) => item.name !== "index.mdx"
    );

    if (!item.header && indexed) {
      return (
        <ul key={indexed.header}>
          <BaseListItem item={indexed} page={page} />
          <ul className="pl-4">{remaining && renderItems(remaining, page)}</ul>
        </ul>
      );
    }
    return (
      <ul className="pl-4" key={item.header}>
        <BaseListItem item={item} page={page} />
        {item.items && renderItems(item.items, page)}
      </ul>
    );
  });
}
export default async function SideNavigation({ page }: { page: string }) {
  const navBar = await inspectDirectory();
  const groupClasses = ["text-xl active:font-bold"];
  // this is weird
  if (page === "/guides/undefined") {
    groupClasses.push("font-bold");
  }
  return (
    <aside aria-label="Sidenav" className="pr-4 pt-4 pb-4 whitespace-nowrap">
      {renderItems(navBar, page)}
    </aside>
  );
}

export async function generateStaticParams() {
  return await inspectDirectory();
}
