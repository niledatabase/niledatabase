import Hero from "./_components/Hero";
import Virtualization from "./_components/Virtualization";
import Container from "@/app/_components/common/Container";
import { HeroBottom } from "@/app/_components/common/Hero";
import TweetCarousel from "./_components/TweetCarousel";
import PurposeBuilt from "./_components/PurposeBuilt";
import UnlimitedVirtualDbs from "./_components/UnlimitedVirtualDbs";
import EmbeddingsCost from "./_components/EmbeddingsCost";
import Autoscale from "./_components/Autoscale";
import PlaceTenants from "./_components/PlaceTenants";
import BottomFour from "./_components/BottomFour";

export default async function Home() {
  return (
    <Container background={null}>
      <Hero />
      <TweetCarousel />
      <PurposeBuilt />
      <UnlimitedVirtualDbs />
      <EmbeddingsCost />
      <Virtualization />
      <Autoscale />
      <PlaceTenants />
      <BottomFour />
      <HeroBottom />
    </Container>
  );
}
