import { notFound } from "next/navigation";
import { MDXProps } from "mdx/types";
import { PageContentProps } from "./types";
import SideNavigation, { NavigationRoots } from "../SideNavigation";
import TableOfContents from "./TableOfContents";
import findDocFile from "../../_utils/findDocFile";
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
      <div className="flex flex-row h-full items-start justify-center w-full flex-1">
        <div className="relative">
          <article className="prose prose-invert p-4 mt-20 lg:max-w-[45rem] lg:w-[45rem] 2xl:w-[70rem] 2xl:max-w-[70rem] docs">
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
  const { Component } = await findDocFile({ params, page, root });
  if (!Component) {
    return notFound();
  }
  return <PageContent Component={Component} page={page} root={root} />;
}
