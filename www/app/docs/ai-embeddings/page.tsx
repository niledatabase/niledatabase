import PageContent from "@/app/docs/_components/PageContent";
import { Param } from "@/app/docs/_components/PageContent/types";
import { NavigationRoots } from "@/app/docs/_components/SideNavigation/types";
import Container from "../../_components/Container";
import { makeMetadata } from "../../_utils/metadata";
type Props = { params: Param };
export default async function Page(props: Props) {
  return (
    <Container>
      <PageContent params={props.params} root={NavigationRoots.AI} />
    </Container>
  );
}
export const generateMetadata = makeMetadata(NavigationRoots.AI);
