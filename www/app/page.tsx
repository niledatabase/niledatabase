import Video from "./_components/Video";
import Divider from "@/app/_components/common/Divider";
import Hero from "./_components/Hero";
import Virtualization from "./_components/Virtualization";
import DropInUserManagement from "./_components/DropInUserManagement";
import ScaleGlobally from "./_components/ScaleGlobally";
import CustomerDashboards from "./_components/CustomerDashboards";
import Elastic from "./_components/Elastic";
import ArtificialIntelligence from "./_components/ArtificialIntelligence";
import Container from "@/app/_components/common/Container";
import { HeroBottom } from "@/app/_components/common/Hero";
export default function Home() {
  return (
    <Container>
      <Hero />
      <div className="border rounded-2xl border-gray p-2 relative bg-black">
        <div className="bg-video-bg absolute -left-[25%] top-0 bottom-0 right-[100%] -z-10 bg-[size:100%] opacity-60 bg-center" />
        <Video poster="dashboard.webp" src="snapshot.mp4" />
        <div className="bg-video-bg absolute left-[100%] top-0 bottom-0 -right-[25%] -z-10 bg-[size:100%] opacity-60 rotate-180 bg-center" />
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
      <ArtificialIntelligence />
      <Divider />
      <Elastic />
      <Divider flip />
      <HeroBottom />
    </Container>
  );
}
