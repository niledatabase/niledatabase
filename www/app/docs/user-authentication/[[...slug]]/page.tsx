import { ResolvingMetadata, Metadata } from "next";
import Container from "../../_components/Container";
import PageContent from "../../_components/PageContent";
import { Param } from "../../_components/PageContent/types";
import { NavigationRoots } from "../../_components/SideNavigation/types";
import findDocFile from "../../_utils/findDocFile";
import { getTitle } from "../../_utils/getTitle";

type Props = { params: Param };
export default async function Page(props: Props) {
  return (
    <Container>
      <PageContent
        params={props.params}
        root={NavigationRoots.UserAuthentication}
      />
    </Container>
  );
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { metadata, path } = await findDocFile({
    ...props,
    root: NavigationRoots.UserAuthentication,
  });

  const previousImages = (await parent).openGraph?.images || [];
  const title = await getTitle({ path, metadata, url: import.meta.url });
  return {
    title,
    description: metadata?.description,
    openGraph: {
      images: [...previousImages],
    },
  };
}
