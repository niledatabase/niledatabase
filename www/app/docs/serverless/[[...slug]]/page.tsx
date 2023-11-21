import { ResolvingMetadata, Metadata } from "next";
import Container from "../../_components/Container";
import PageContent from "../../_components/PageContent";
import { Param } from "../../_components/PageContent/types";
import { NavigationRoots } from "../../_components/SideNavigation/types";
import findDocFile from "../../_utils/findDocFile";
type Props = { params: Param };
export default async function Page(props: Props) {
  return (
    <Container>
      <PageContent
        params={props.params}
        root={NavigationRoots.Serverless}
      />
    </Container>
  );
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { metadata } = await findDocFile({
    ...props,
    root: NavigationRoots.Serverless,
  });

  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: metadata?.title,
    description: metadata?.description,
    openGraph: {
      images: [...previousImages],
    },
  };
}
