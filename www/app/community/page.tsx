import Container from '@/app/_components/common/Container';
import Divider from '@/app/_components/common/Divider';
import GradientButton from '@/app/_components/common/GradientButton';
import Heading from '@/app/_components/common/Heading';
import PageHeader from '@/app/_components/common/PageHeader';
import Image from 'next/image';
import TemplateSearch from '../templates/TemplateSearch';
import loadTemplates from '../templates/dataFetcher';

export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container>
      <div className="flex gap-5 items-center flex-col mb-[184px]">
        <PageHeader
          title={
            <div className="flex flex-row gap-10">
              We{' '}
              <Image
                src="/heart.svg"
                alt="orange 8-bit heart"
                width={82}
                height={72}
              />{' '}
              developers
            </div>
          }
          subtitle="Join the Nile community to learn, share and collaborate with thousands of other developers: Together, we will build the best platform to build and accelerate SaaS"
          subtitleClasses="w-2/3"
          color="white"
        />
      </div>
      <div className="flex flex-row w-full justify-between gap-10">
        <div className="flex flex-col gap-10 itemDivider p-8">
          <Image
            src="/github-text.svg"
            alt="github text in black and white gradient"
            width={122}
            height={34}
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-2xl z-10 relative">
            Join Github discussions for roadmap and issues
          </div>
        </div>
        <div className="flex flex-col gap-10 itemDivider p-8">
          <Image
            src="/discord.svg"
            alt="github text in black and white gradient"
            width={189}
            height={52}
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-2xl z-10 relative">
            Participate in online conversations and forums
          </div>
        </div>
        <div className="flex flex-col gap-10 itemDivider p-8">
          <Image
            src="/x.svg"
            alt="github text in black and white gradient"
            width={47}
            height={44}
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-2xl z-10 relative">
            Follow us on X to learn and network
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex gap-4 flex-col">
        <Heading text="Templates" textAlign="left" />
        <div className="flex flex-row justify-between py-4 w-full">
          <div className="text-xl opacity-60 w-1/2">
            Get started with one of the hundreds of Nile templates built by the
            community. Contribute your own template to help others.
          </div>
          <GradientButton href="/templates">
            <Image
              src="/icons/plus.svg"
              alt="orange plus sign"
              width={24}
              height={24}
            />
            <span className="pl-2">Add Your Template</span>
          </GradientButton>
        </div>
        <TemplateSearch templates={templates} searchEnabled={false} />
        <div className="flex justify-center">
          <GradientButton href="/templates">
            Browse more templates
          </GradientButton>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 justify-center w-full">
        <Heading text="Learn from our Tutorials" textAlign="left" />
        <div className="text-xl opacity-60 justify-start text-left">
          Get started with one of the hundreds of Nile tutorials
        </div>
        <div className="flex justify-center">
          <GradientButton>Browse more tutorials</GradientButton>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-4 justify-center w-full">
        <Heading>
          <div className="flex flex-row gap-4 justify-center">
            <Image
              src="/saas-community-logo.png"
              alt="purple cloud"
              width={93}
              height={61}
            />
            <h2 className="leading-[64px] text-center text-[56px] font-normal text-white">
              SaaS Developer Community
            </h2>
          </div>
        </Heading>
        <div className="flex justify-center">
          <div className="text-xl opacity-60 w-2/3 flex justify-center text-center">
            Watch the SaaS podcast to learn numerous SaaS problems and solutions
            tackled by hundreds of SaaS companies from the cummunity
          </div>
        </div>
        <div className="flex justify-center">
          <GradientButton>Join community</GradientButton>
        </div>
      </div>
    </Container>
  );
}
