import { notFound } from 'next/navigation';
import SideNavigation from '../SideNavigation/SideNavigation';
import { MDXProps } from 'mdx/types';
import { PageContentProps } from './types';
import { NavigationRoots } from '../SideNavigation';

type Props = {
  page: string | undefined;
  Component: (props: MDXProps) => JSX.Element;
  root: NavigationRoots;
};

function PageContent(props: Props) {
  const { page, Component, root } = props;
  return (
    <div className="flex">
      <SideNavigation page={`/docs${root}${page ? `/docs${page}` : ''}`} />
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

export default async function Page(props: PageContentProps) {
  const { params, root } = props;
  const page = params?.slug
    ?.map((str: string) => decodeURIComponent(str))
    .join('/');
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
