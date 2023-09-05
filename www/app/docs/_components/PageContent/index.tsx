import { notFound } from "next/navigation";
import { MDXProps } from "mdx/types";
import { PageContentProps } from "./types";
import SideNavigation, { NavigationRoots } from "../SideNavigation";
import TableOfContents from "./TableOfContents";

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
      <div className="pl-4 w-full flex flex-row h-full">
        <div className="w-[1px] bg-border"></div>
        <div className="mx-auto w-full flex flex-row justify-start h-full">
          <div className="relative flex flex-row">
            <article className="prose prose-invert max-w-5xl mt-20 px-4">
              <Component />
            </article>
            {toc.length > 1 && (
              <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-border h-full"></div>
            )}
          </div>
          <TableOfContents toc={toc} />
        </div>
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
