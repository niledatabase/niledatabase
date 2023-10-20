import PageContent from "@/app/docs/_components/PageContent";
import { Param } from "@/app/docs/_components/PageContent/types";
import { NavigationRoots } from "@/app/docs/_components/SideNavigation/types";
import Container from "../../_components/Container";
import Head from "next/head";
import { Metadata, ResolvingMetadata } from "next";

type Props = { params: Param };
export default async function Page(props: Props) {
  return (
    <Container>
      <PageContent
        params={props.params}
        root={NavigationRoots.TenantManagement}
      />
    </Container>
  );
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { params } = props;

  let _meta = {} as Metadata;
  // on the index page
  if (params && Object.keys(params).length === 0) {
    try {
      const { meta } = (await import(`../[[...slug]]/index.mdx`)) as any;
      _meta = meta;
    } catch (e) {
      // its ok to not have in index page
    }
  }

  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: _meta?.title,
    description: _meta?.description,
    openGraph: {
      images: [...previousImages],
    },
  };
}
