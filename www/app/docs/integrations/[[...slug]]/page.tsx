import Container from "../../_components/Container";
import PageContent from "../../_components/PageContent";
import { Param } from "../../_components/PageContent/types";
import { NavigationRoots } from "../../_components/SideNavigation/types";
import { makeMetadata } from "../../_utils/metadata";
type Props = { params: Param };
export default async function Page(props: Props) {
  return (
    <Container>
      <PageContent params={props.params} root={NavigationRoots.Integrations} />
    </Container>
  );
}

export const generateMetadata = makeMetadata(NavigationRoots.Integrations);
