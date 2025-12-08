import Container from '@/app/_components/common/Container';
import Divider from '@/app/_components/common/Divider';
import GradientButton from '@/app/_components/common/GradientButton';
import Heading from '@/app/_components/common/Heading';
import PageHeader from '@/app/_components/common/PageHeader';
import Image from 'next/image';
import TemplateSearch from '../templates/TemplateSearch';
import loadTemplates from '../templates/dataFetcher';
import Link from 'next/link';
import Tutorials from './_components/Tutorials';
import Community from './_components/Community';
import Heart from '@/public/heart.svg';
import GithubText from '@/public/github-text.svg';
import Discord from '@/public/discord.svg';
import X from '@/public/x.svg';
import Templates from '@/public/icons/templates.svg';
export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container background="community">
      <div className="container mx-auto">
        <div className="pb-0 md:px-4 md:py-4 2xl:px-24 2xl:py-4">
          <div className="mb-[184px] flex flex-col items-center">
            <PageHeader
              title={
                <div className="mt-32 flex w-full flex-row items-center justify-center">
                  We
                  <Image
                    src={Heart}
                    alt="orange 8-bit heart"
                    width={98}
                    height={98}
                    data-image-zoom-disabled
                  />
                  Developers
                </div>
              }
              subtitle={
                <>
                  <div className="-mb-2 max-w-[905px] leading-[32px]">
                    Join the Nile community to learn, share and collaborate with
                    thousands of other developers: Together, we will build the
                    best platform to build and accelerate SaaS
                  </div>
                </>
              }
              color="white"
            />
          </div>
          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            <Link
              href="https://github.com/niledatabase/niledatabase/discussions"
              target="_blank"
            >
              <div className="itemDivider flex flex-col gap-10 p-8">
                <Image
                  src={GithubText}
                  alt="github text in black and white gradient"
                  width={122}
                  height={34}
                  className="relative z-10"
                  data-image-zoom-disabled
                />
                <div className="relative z-10 max-w-[320px] bg-gradient-white bg-clip-text text-center text-[20px] leading-[32px] text-transparent">
                  Join Github discussions for roadmap and issues
                </div>
              </div>
            </Link>
            <Link href="https://discord.gg/8UuBB84tTy" target="_blank">
              <div className="itemDivider flex flex-col gap-6 p-8">
                <Image
                  src={Discord}
                  alt="discord text in black and white gradient"
                  width={191}
                  height={52}
                  className="relative z-10"
                  data-image-zoom-disabled
                />
                <div className="relative z-10 max-w-[320px] bg-gradient-white bg-clip-text text-center text-[20px] leading-[32px] text-transparent">
                  Participate in online conversations and forums
                </div>
              </div>
            </Link>
            <Link href="https://x.com/niledatabase" target="_blank">
              <div className="itemDivider flex flex-col gap-8 p-8">
                <Image
                  src={X}
                  alt="X text in black and white gradient"
                  width={47}
                  height={44}
                  className="relative z-10"
                  data-image-zoom-disabled
                />
                <div className="relative z-10 max-w-[280px] bg-gradient-white bg-clip-text text-center text-[20px] leading-[32px] text-transparent">
                  Follow us on X to learn and network
                </div>
              </div>
            </Link>
          </div>
          <Divider />
          <div className="container flex flex-col gap-4">
            <Heading text="Templates" />
            <div className="text-center text-xl opacity-80">
              Get started with one of our Nile templates built by the community.
              Contribute your own template to help others.
            </div>
            <TemplateSearch
              templates={templates}
              searchEnabled={false}
              showButton={false}
            />
            <div className="mt-10 flex justify-center">
              <div>
                <GradientButton href="/templates" variant="soft">
                  <Image
                    src={Templates}
                    alt="book cover"
                    width={24}
                    height={24}
                    data-image-zoom-disabled
                  />
                  <span className="bg-gradient-white bg-clip-text pl-2 text-[16px] text-transparent subpixel-antialiased">
                    Browse more templates
                  </span>
                </GradientButton>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex w-full flex-col justify-center gap-4">
            <Tutorials />
          </div>
          <Divider />
          <div className="flex w-full flex-col justify-center gap-4">
            <Community />
          </div>
        </div>
      </div>
    </Container>
  );
}

export const metadata = {
  title: 'Community | Nile Database',
  description: 'Join the community of SaaS developers',
  openGraph: {
    images: 'opengraph/community.jpg',
  },
};
