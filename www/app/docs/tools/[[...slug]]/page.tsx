import PageContent from "@/app/docs/_components/PageContent";
import { Param } from "@/app/docs/_components/PageContent/types";
import { NavigationRoots } from "@/app/docs/_components/SideNavigation/types";
import Container from "../../_components/Container";
import { ResolvingMetadata, Metadata } from "next";
import findDocFile from "../../_utils/findDocFile";
type Props = { params: Param };
export default async function Page(props: Props) {
  return (
    <Container>
      <PageContent params={props.params} root={NavigationRoots.Tools} />
    </Container>
  );
}
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { metadata } = await findDocFile({
    ...props,
    root: NavigationRoots.Tools,
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
