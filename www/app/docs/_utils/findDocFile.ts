import { Param } from "../_components/PageContent/types";
import { MDXProps } from "mdx/types";

type Props = { params?: Param; page?: string; root: string };
type Metadata = {
  title: string;
  description: string;
};

type ValidComponent = (props: MDXProps) => JSX.Element;

export function getPage(params?: Param, page?: string) {
  const possiblePage = params?.slug?.join("/");
  if (possiblePage) {
    return possiblePage;
  }
  return page;
}

export default async function findDocFile(props: Props): Promise<{
  metadata: Metadata;
  Component: void | ValidComponent;
  path: void | string;
}> {
  const { params, root } = props;

  const page = getPage(params, props.page);

  // on the index page
  if (params && Object.keys(params).length === 0) {
    try {
      const { metadata, default: Component } = (await import(
        `../${root}/[[...slug]]/index.mdx`
      )) as any;
      return { metadata, Component, path: `./index.mdx` };
    } catch (e) {
      // its ok to not have in index page
    }
  }

  try {
    const { metadata, default: Component } = (await import(
      `../${root}/[[...slug]]/${page}.mdx`
    )) as any;
    return { metadata, Component, path: `./${page}.mdx` };
  } catch (e) {
    // try again
  }

  try {
    const { metadata, default: Component } = await import(
      `../${root}/[[...slug]]/${page}/index.mdx`
    );
    return {
      metadata,
      Component,
      path: `./${page}/index.mdx`,
    };
  } catch (e) {
    // do nothing
  }

  const _meta = {} as Metadata;
  return { metadata: _meta, Component: undefined, path: undefined };
}
