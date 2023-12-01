import { Param } from "../_components/PageContent/types";
import { MDXProps } from "mdx/types";

type Props = { params?: Param; page?: string; root: string };
type Metadata = {
  title: string;
  description: string;
};

type ValidComponent = (props: MDXProps) => JSX.Element;

export default async function findDocFile(props: Props): Promise<{
  metadata: Metadata;
  Component: void | ValidComponent;
}> {
  const { params, page, root } = props;
  // on the index page
  if (params && Object.keys(params).length === 0) {
    try {
      const { metadata, default: Component } = (await import(
        `../${root}/[[...slug]]/index.mdx`
      )) as any;
      return { metadata, Component };
    } catch (e) {
      // its ok to not have in index page
    }
  }
  // in some requests, `page` is missing, so try and figure it out from the params
  const possiblePage = params?.slug?.join("/");

  try {
    const { metadata, default: Component } = (await import(
      `../${root}/[[...slug]]/${possiblePage}.mdx`
    )) as any;
    return { metadata, Component };
  } catch (e) {
    // try again
  }

  try {
    const { metadata, default: Component } = (await import(
      `../${root}/[[...slug]]/${page}.mdx`
    )) as any;
    return { metadata, Component };
  } catch (e) {
    // try again
  }

  try {
    const { metadata, default: Component } = (await import(
      `../${root}/[[...slug]]/${possiblePage}/index.mdx`
    )) as any;
    return { metadata, Component };
  } catch (e) {
    // try again
  }

  try {
    const { metadata, default: Component } = await import(
      `../${root}/[[...slug]]/${page}/index.mdx`
    );
    return { metadata, Component };
  } catch (e) {
    // do nothing
  }

  const _meta = {} as Metadata;
  return { metadata: _meta, Component: undefined };
}
