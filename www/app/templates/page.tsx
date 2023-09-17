import Divider from "@/app/_components/common/Divider";
import PageHeader from "@/app/_components/common/PageHeader";
import loadTemplates from "./dataFetcher";
import { HeroBottom } from "@/app/_components/common/Hero";
import TemplateSearch from "./TemplateSearch";
import Container from "@/app/_components/common/Container";

export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container background="templates">
      <PageHeader
        title="Find your Template"
        subtitle="Quickly build your SaaS application with these pre built templates"
        subtitleClasses="mb-[120px]"
      />
      <div className="mt-20" />
      <Divider />
      <TemplateSearch templates={templates} />
      <Divider />
      <div className="py-12">
        <HeroBottom titleClasses="!leading-[64px] !text-[56px]" />
      </div>
    </Container>
  );
}
