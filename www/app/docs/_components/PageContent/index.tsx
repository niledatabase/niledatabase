import { notFound } from "next/navigation";
import { MDXProps } from "mdx/types";
import { PageContentProps } from "./types";
import SideNavigation, { NavigationRoots } from "../SideNavigation";
import TableOfContents from "./TableOfContents";
import "highlight.js/styles/github-dark.css";

type Props = {
  page: string | undefined;
  Component: (props: MDXProps) => JSX.Element;
  root: NavigationRoots;
};

// this is here to to remove the line if necessary
const generateTableOfContents = (
  Component: (props: MDXProps) => JSX.Element
): { id: string; children: string }[] => {
  const { children } = Component({}).props;
  if (typeof children === "string") {
    return [{ id: String(children), children: "" }];
  }
  const headings = children
    .filter((child: any) => {
      return child.props?.id;
    })
    .map((child: { props: { id: string; children: string } }) => {
      return child.props;
    });

  return headings;
};

function PageContent(props: Props) {
  const { root, page, Component } = props;

  const toc = generateTableOfContents(Component);
  return (
    <>
      <SideNavigation page={`/docs/${root}${page ? `/${page}` : ""}`} />
      <div className="flex flex-row h-full items-start w-full flex-1">
        <div className="relative">
          <article className="prose prose-invert p-4 mt-20 lg:max-w-[50rem] lg:w-[50rem] 2xl:w-[62rem] 2xl:max-w-[62rem] docs">
            <Component />
          </article>
          {toc.length > 1 && (
            <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-border h-full hidden xl:block"></div>
          )}
        </div>
        <TableOfContents toc={toc} />
      </div>
    </>
  );
}

export default async function Page(props: PageContentProps) {
  const { params, root } = props;
  const page = params?.slug
    ?.map((str: string) => decodeURIComponent(str))
    .join("/");
  // on the index page
  if (params && Object.keys(params).length === 0) {
    try {
      const { default: Component } = await import(
        `../../${root}/[[...slug]]/index.mdx`
      );
      return <PageContent Component={Component} page={page} root={root} />;
    } catch (e) {
      // its ok to not have in index page
    }
  }

  try {
    const { default: Component } = await import(
      `../../${root}/[[...slug]]/${page}.mdx`
    );
    return <PageContent Component={Component} page={page} root={root} />;
  } catch (e) {
    // try again
  }

  try {
    const { default: Component } = await import(
      `../../${root}/[[...slug]]/${page}/index.mdx`
    );
    return <PageContent Component={Component} page={page} root={root} />;
  } catch (e) {
    // do nothing
  }

  return notFound();
}
