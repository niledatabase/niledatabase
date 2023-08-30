import PageContent from '@/app/docs/_components/PageContent';
import { Param } from '@/app/docs/_components/PageContent/types';
import { NavigationRoots } from '@/app/docs/_components/SideNavigation/types';

export default async function Page(props: { params: Param }) {
  return <PageContent params={props.params} root={NavigationRoots.Guides} />;
}
