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
import GradientButton from "./_components/common/GradientButton";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <Container>
      <Hero />
      <div className="border rounded-2xl border-gray p-2 relative bg-black overflow-hidden lg:overflow-visible">
        <div className="w-[10%] bg-video-bg absolute -left-[10%] top-0 bottom-0 right-[100%] -z-10 opacity-60 bg-center bg-no-repeat bg-cover" />
        <Video poster="dashboard.webp" src="snapshot.mp4" />
        <div className="w-[10%] bg-video-bg absolute left-[100%] top-0 bottom-0 -right-[10%] -z-10 opacity-60 rotate-180 bg-center bg-no-repeat bg-cover" />
      </div>
      <Virtualization />
      <DropInUserManagement />
      <ScaleGlobally />
      <CustomerDashboards />
      <ArtificialIntelligence />
      <Elastic />
      <Divider flip />
      <HeroBottom />
    </Container>
  );
}
