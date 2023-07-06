import { NavigationRoots } from "../SideNavigation/types";

export type Param = {
  slug?: string[];
  header?: string;
  file?: string;
};

export type PageContentProps = {
  params?: Param;
  root: NavigationRoots;
};
