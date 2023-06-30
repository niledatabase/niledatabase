import { notFound } from "next/navigation";
import SideNavigation from "./SideNavigation";
import inspectDirectory from "./inspectDirectory";
import { Param } from "./types";
import { MDXProps } from "mdx/types";

type Props = {
  params: Param;
};

type PageContentProps = {
  page: string | undefined;
  Component: (props: MDXProps) => JSX.Element;
};

function PageContent(props: PageContentProps) {
  const { page, Component } = props;
  return (
    <div className="flex">
      <SideNavigation page={`/guides/${page}`} />
      <div className="container mx-auto my-4">
        <div>
          <article className="prose dark:prose-invert">
            <Component />
          </article>
        </div>
      </div>
    </div>
  );
}

export default async function Page(props: Props) {
  const { params } = props;
  const page = params.slug
    ?.map((str: string) => decodeURIComponent(str))
    .join("/");

  // on the index page
  if (params && Object.keys(params).length === 0) {
    const { default: Component } = await import(`./index.mdx`);
    return <PageContent Component={Component} page={page} />;
  }

  try {
    const { default: Component } = await import(`./${page}.mdx`);
    return <PageContent Component={Component} page={page} />;
  } catch (e) {
    // try again
  }

  try {
    const { default: Component } = await import(`./${page}/index.mdx`);
    return <PageContent Component={Component} page={page} />;
  } catch (e) {
    // do nothing
  }

  return notFound();
}
