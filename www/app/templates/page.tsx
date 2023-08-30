import Divider from "@/app/_components/common/Divider";
import PageHeader from "@/app/_components/common/PageHeader";
import loadTemplates from "./dataFetcher";
import { HeroBottom } from "@/app/_components/common/Hero";
import TemplateSearch from "./TemplateSearch";
import Container from "@/app/_components/common/Container";

export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container hidePattern={true}>
      <PageHeader
        title="Find or Build your Template"
        subtitle="Quickly build your SaaS application with these
pre built templates"
      />
      <Divider />
      <TemplateSearch templates={templates} />
      <Divider />
      <HeroBottom />
    </Container>
  );
}
