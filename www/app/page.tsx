import Hero from "./_components/Hero";
import Virtualization from "./_components/Virtualization";
import Container from "@/app/_components/common/Container";
import { HeroBottom } from "@/app/_components/common/Hero";
import BuiltOnNile from "./_components/BuildOnNile";
import PurposeBuilt from "./_components/PurposeBuilt";
import UnlimitedVirtualDbs from "./_components/UnlimitedVirtualDbs";
import AIPartners from "./_components/AIPartners";
import EmbeddingsCost from "./_components/EmbeddingsCost";
import Autoscale from "./_components/Autoscale";
import PlaceTenants from "./_components/PlaceTenants";
import BottomFour from "./_components/BottomFour";
export default function Home() {
  return (
    <Container background={null}>
      <Hero />
      <BuiltOnNile />
      <PurposeBuilt />
      <UnlimitedVirtualDbs />
      <AIPartners />
      <EmbeddingsCost />
      <Virtualization />
      <Autoscale />
      <PlaceTenants />
      <BottomFour />
      <HeroBottom />
    </Container>
  );
}
