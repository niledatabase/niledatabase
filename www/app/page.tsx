import Video from "./Video";
import Divider from "@/common/Divider";
import Hero from "./Hero";
import Virtualization from "./Virtualization";
import DropInUserManagement from "./DropInUserManagement";
import ScaleGlobally from "./ScaleGlobally";
import CustomerDashboards from "./CustomerDashboards";
import Elastic from "./Elastic";
import ArtificialIntelligence from "./ArtificialIntelligence";
import Container from "@/common/Container";
import { HeroBottom } from "@/common/Hero";
export default function Home() {
  return (
    <Container>
      <Hero />
      <div className="border rounded-2xl border-gray p-2">
        <Video poster="dashboard.svg" src="snapshot.mp4" />
      </div>
      <Divider />
      <Virtualization />
      <Divider />
      <DropInUserManagement />
      <Divider />
      <ScaleGlobally />
      <Divider />
      <CustomerDashboards />
      <Divider />
      <Elastic />
      <Divider />
      <ArtificialIntelligence />
      <Divider />
      <HeroBottom />
    </Container>
  );
}
