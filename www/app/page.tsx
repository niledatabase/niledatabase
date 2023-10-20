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
      <div className="flex flex-row w-full justify-center">
        <div className="w-[20%] bg-video-bg -z-10 opacity-60 bg-[center_right] bg-no-repeat bg-contain" />
        <div className="border rounded-2xl border-gray p-2 relative bg-black max-w-7xl">
          <Video poster="dashboard.webp" src="snapshot.mp4" />
        </div>
        <div className="w-[20%] bg-video-bg -z-10 opacity-60 -scale-100 bg-[center_right] bg-no-repeat bg-contain" />
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
