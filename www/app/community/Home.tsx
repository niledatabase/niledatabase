import Container from "@/app/_components/common/Container";
import Divider from "@/app/_components/common/Divider";
import GradientButton from "@/app/_components/common/GradientButton";
import Heading from "@/app/_components/common/Heading";
import PageHeader from "@/app/_components/common/PageHeader";
import Image from "next/image";
import TemplateSearch from "../templates/TemplateSearch";
import loadTemplates from "../templates/dataFetcher";
import Tutorials from "./_components/Tutorials";
import Community from "./_components/Community";
import { CommunityLinks } from "../_components/common/CommunityLinks";

export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container>
      <div className="flex gap-5 items-center flex-col mb-[184px] w`">
        <PageHeader
          title={
            <div className="flex flex-row">
              We
              <Image
                src="/heart.svg"
                alt="orange 8-bit heart"
                width={98}
                height={98}
              />
              developers
            </div>
          }
          subtitle={
            <>
              <div>
                Join the Nile community to learn, share and collaborate with
                thousands of other developers:{" "}
              </div>
              <div>
                Together, we will build the best platform to build and
                accelerate SaaS
              </div>
            </>
          }
          color="white"
        />
      </div>
      <CommunityLinks />
      <Divider />
      <div className="flex gap-4 flex-col">
        <Heading text="Templates" textAlign="left" />
        <div className="flex flex-row justify-between pb-10 w-full">
          <div className="text-xl opacity-60 w-1/2">
            Get started with one of the hundreds of Nile templates built by the
            community. Contribute your own template to help others.
          </div>
        </div>
        <TemplateSearch templates={templates} searchEnabled={false} />
        <div className="flex justify-center mt-10">
          <GradientButton href="/templates" variant="soft">
            <Image
              src="/icons/templates.svg"
              alt="book cover"
              width={24}
              height={24}
            />
            <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
              Browse more templates
            </span>
          </GradientButton>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 justify-center w-full">
        <Tutorials />
      </div>
      <Divider />
      <div className="flex flex-col gap-4 justify-center w-full">
        <Community />
      </div>
    </Container>
  );
}
