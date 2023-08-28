import PageContent from "~/components/PageContent";
import { Param } from "~/components/PageContent/types";
import { NavigationRoots } from "~/components/SideNavigation/types";

export default async function Page(props: { params: Param }) {
  return (
    <PageContent params={props.params} root={NavigationRoots.UserManagement} />
  );
}
