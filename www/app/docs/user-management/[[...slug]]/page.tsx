import Container from "../../_components/Container";
import PageContent from "../../_components/PageContent";
import { Param } from "../../_components/PageContent/types";
import { NavigationRoots } from "../../_components/SideNavigation/types";

export default async function Page(props: { params: Param }) {
  return (
    <Container>
      <PageContent
        params={props.params}
        root={NavigationRoots.UserManagement}
      />
    </Container>
  );
}
