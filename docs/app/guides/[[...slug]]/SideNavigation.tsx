import Link from "next/link";
import inspectDirectory from "./inspectDirectory";
import { Param } from "./types";

const createNav = async (params: Param[]) => {
  const returnable: {
    [key: string]: Array<Param & { order: number; title?: string }>;
  } = {};
  for (const param of params) {
    const { file, slug, header } = param;
    const { meta } = await import(`./${file?.slice(1, file.length)}`);
    if (slug) {
      for (const s of slug) {
        if (s && !/\.mdx$/.test(s)) {
          if (!returnable[s]) {
            returnable[s] = [{ file, slug, header, ...meta }];
          } else {
            returnable[s].push({ file, slug, header, ...meta });
            returnable[s].sort((a, b) => {
              if (a?.file?.endsWith("index.mdx")) {
                return -1;
              }
              return a.order - b.order;
            });
          }
        }
      }
    }
  }
  return returnable;
};

export default async function SideNavigation({ page }: { page: string }) {
  const pages = await inspectDirectory();
  const groupClasses = ["text-xl active:font-bold"];
  // this is weird
  if (page === "/guides/undefined") {
    groupClasses.push("font-bold");
  }
  const [_, ...remaining] = pages ?? [];
  const nav = await createNav(remaining);
  const headers = Object.keys(nav);

  return (
    <aside aria-label="Sidenav" className="p-4 whitespace-nowrap">
      <ul>
        <li>
          <Link className={groupClasses.join(" ")} href={`/guides`}>
            Guides
          </Link>

          <ul>
            {headers.map((header) => {
              const [first, ...items] = nav[header];
              const headerHref = `/guides${first.slug
                ?.join("/")
                .replace(/.mdx$/, "")}`;
              const headerClasses = ["text-lg active:font-bold"];
              if (page === headerHref) {
                headerClasses.push("font-bold");
              }
              return (
                <li key={first.header} className="pl-4">
                  <Link className={headerClasses.join(" ")} href={headerHref}>
                    {first.title ?? first.header}
                  </Link>
                  <ul>
                    {items.map(({ title, slug, header }) => {
                      const href = `/guides${slug
                        ?.join("/")
                        .replace(/.mdx$/, "")}`;
                      const itemClasses = ["active:font-bold"];
                      if (page === href) {
                        itemClasses.push("font-bold");
                      }
                      // just going to assume the 1st order ones are higher level for now
                      return (
                        <li key={href} className="pl-4">
                          <Link className={itemClasses.join(" ")} href={href}>
                            {title ?? header ?? href}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export async function generateStaticParams() {
  return await inspectDirectory();
}
