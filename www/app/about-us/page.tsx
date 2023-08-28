import Container from "@/common/Container";
import Divider from "@/common/Divider";
import { HeroBottom, HeroText } from "@/common/Hero";
import PageHeader from "@/common/PageHeader";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="flex gap-5 items-center flex-col">
        <Image src="/about-logo.png" alt="nile logo" width={150} height={151} />
        <div className="text-lg opacity-60">Our Mission</div>
        <PageHeader title="To enable developers to accelerate the next billion modern SaaS applications" />
      </div>
      <Divider />
      <HeroBottom />
    </Container>
  );
}
