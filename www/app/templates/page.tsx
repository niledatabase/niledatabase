import Divider from "@/common/Divider";
import Footer from "@/common/Footer";
import Navigation from "@/common/Navigation";
import PageHeader from "@/common/PageHeader";
import loadTemplates from "./dataFetcher";
import { HeroBottom } from "@/common/Hero";
import TemplateSearch from "./TemplateSearch";
import Container from "@/common/Container";

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
