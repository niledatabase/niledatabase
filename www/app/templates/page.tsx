import Divider from '@/app/_components/common/Divider';
import PageHeader from '@/app/_components/common/PageHeader';
import loadTemplates from './dataFetcher';
import { HeroBottom } from '@/app/_components/common/Hero';
import TemplateSearch from './TemplateSearch';
import Container from '@/app/_components/common/Container';

export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container background={null}>
      <div className="container mx-auto">
        <div className="mt-32 pb-0 md:px-4 md:py-4 2xl:px-24 2xl:py-4">
          <div className="relative bg-[size:80%] bg-[center_110px] bg-no-repeat md:bg-templates xl:pb-[86px]">
            <PageHeader
              title="Find your template"
              subtitle="Quickly build your SaaS application with these pre built templates"
              subtitleClasses="pb-8 lg:pb-[120px]"
            />
          </div>
          <div className="bgDivider flex flex-1 flex-col pt-20 text-center align-middle">
            <TemplateSearch templates={templates} />
          </div>
          <Divider />
          <div className="py-12">
            <HeroBottom />
          </div>
        </div>
      </div>
    </Container>
  );
}

export const metadata = {
  title: 'Templates | Nile Database',
  description: 'Try out how easy it can be to develop SaaS',
  openGraph: {
    images: 'opengraph/templates.jpg',
  },
};
