import Navigation from "./navigation/Navigation";
import Video from "./Video";
import Divider from "./Divider";
import Hero, { HeroBottom } from "./Hero";
import Virtualization from "./Virtualization";
import DropInUserManagement from "./DropInUserManagement";
import ScaleGlobally from "./ScaleGlobally";
import CustomerDashboards from "./CustomerDashboards";
import Elastic from "./Elastic";
import ArtificialIntelligence from "./ArtificialIntelligence";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-pattern bg-no-repeat bg-top relative bg-[size:100%] container mx-auto">
      <Navigation />
      <main className="flex flex-col items-center justify-between px-24 py-16">
        <Hero />
        <div className="border rounded-2xl border-[#dfeffe24] p-2">
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
        <Divider />
        <Footer />
      </main>
    </div>
  );
}
