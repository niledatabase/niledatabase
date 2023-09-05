import PageContent from "@/app/docs/_components/PageContent";
import { Param } from "@/app/docs/_components/PageContent/types";
import { NavigationRoots } from "@/app/docs/_components/SideNavigation/types";
import Container from "../../_components/Container";

export default async function Page(props: { params: Param }) {
  return (
    <Container>
      <PageContent params={props.params} root={NavigationRoots.Learn} />
    </Container>
  );
}
