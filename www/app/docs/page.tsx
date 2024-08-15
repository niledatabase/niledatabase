import Image from "next/image";
import Container from "./_components/Container";
import SideNavigation from "./_components/SideNavigation";
import PageHeader from "../_components/common/PageHeader";
import Divider from "../_components/common/Divider";
import TemplateSearch from "../templates/TemplateSearch";
import loadTemplates from "../templates/dataFetcher";
import { CommunityLinks } from "../_components/common/CommunityLinks";
import GradientButton from "../_components/common/GradientButton";
import Link from "next/link";
import { TutorialList } from "../community/_components/Tutorials";
import NileBgMark from "@/public/icons/nile-bg-mark.svg";
import Templates from "@/public/icons/templates.svg";

const languages = [
  { name: "SQL", icon: "sql.svg", path: "/docs/getting-started/languages/sql" },
  {
    name: "NextJS",
    icon: "nextjs.svg",
    path: "/docs/getting-started/languages/nextjs",
  },
  {
    name: "Node",
    icon: "node.svg",
    path: "/docs/getting-started/languages/node",
  },
  {
    name: "Drizzle",
    icon: "drizzle.svg",
    path: "/docs/getting-started/languages/drizzle",
  },
  {
    name: "Prisma",
    icon: "prisma.svg",
    path: "/docs/getting-started/languages/prisma",
  },
  {
    name: "Python",
    icon: "python.svg",
    path: "/docs/getting-started/languages/python",
  },
];

const usecases = [
  {
    name: "Slack++",
    icon: "slack.webp",
    path: "/docs/getting-started/usecases/slack",
  },
  {
    name: "AITravelMate",
    icon: "tripactions.png",
    path: "/docs/getting-started/usecases/tripactions",
  },
  {
    name: "SmartSpend AI",
    icon: "expensify.svg",
    path: "/docs/getting-started/usecases/expensify",
  },
  {
    name: "TaskPilot AI",
    icon: "issue.svg",
    path: "/docs/getting-started/usecases/issue-tracking",
  },
  {
    name: "SalesLeadPilot",
    icon: "lead.svg",
    path: "/docs/getting-started/usecases/lead-management",
  },
  {
    name: "SmartLearn",
    icon: "schoology.png",
    path: "/docs/getting-started/usecases/schoology",
  },
];

const integrations = [
  {
    name: "Stripe",
    icon: "Stripe.svg",
    path: "docs/integrations/stripe",
  },
  {
    name: "NextAuth",
    icon: "nextauth.webp",
    path: "docs/integrations/nextauth",
  },
  {
    name: "Lambda",
    icon: "lambda.svg",
    path: "docs/integrations/lambda",
  },
];
export default async function Home() {
  const templates = await loadTemplates();
  return (
    <Container>
      <SideNavigation page={`/docs`} />
      <div className="flex flex-col px-2 max-w-6xl">
        <div className="container mx-auto">
          <div className="flex flex-row items-start gap-2 mx-auto mt-20 justify-center">
            <Image
              className="mt-2 hidden lg:block"
              src={NileBgMark}
              alt="nile logo"
              width={55}
              height={55}
            />
            <PageHeader
              title="Nile Documentation"
              subtitle="Serverless Postgres for modern SaaS"
            />
          </div>
        </div>
        <Divider />
        <div className="container mx-auto">
          <div className="text-3xl mb-10 lg:text-left text-center">
            Languages and frameworks
          </div>
          <div className="flex flex-wrap flex-row gap-6 max-w-[852px] mx-auto justify-center">
            {languages.map(({ name, icon, path }) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="flex flex-col lg:min-w-[216px] items-center"
                >
                  <div className="icon rounded-[20px] flex justify-center">
                    <Image
                      src={`/icons/${icon}`}
                      alt="book cover"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text=[18px]">{name}</div>
                </Link>
              );
            })}
          </div>
          <Divider />
          <div className="container mx-auto">
            <div className="flex flex-col">
              <div className="flex lg:flex-row flex-col justify-between items-center mb-10 gap-4">
                <div className="text-3xl mb-10 lg:text-left text-center">
                  Use cases
                </div>
                <div className="hidden lg:block">
                  <GradientButton href="/templates" variant="soft">
                    <Image
                      alt="book cover"
                      src={Templates}
                      width={24}
                      height={24}
                    />
                    <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                      More use cases
                    </span>
                  </GradientButton>
                </div>
              </div>
              <div className="flex flex-wrap flex-row gap-6 max-w-[852px] mx-auto justify-center">
                {usecases.map(({ name, icon, path }) => {
                  return (
                    <Link
                      key={path}
                      href={path}
                      className="flex flex-col lg:min-w-[216px] items-center"
                    >
                      <div className="icon rounded-[20px] flex justify-center">
                        <Image
                          src={`/icons/${icon}`}
                          alt="book cover"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="text=[18px]">{name}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:hidden flex justify-center">
            <div>
              <GradientButton href="/templates" variant="soft">
                <Image
                  src={Templates}
                  alt="book cover"
                  width={24}
                  height={24}
                />
                <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                  More tutorials
                </span>
              </GradientButton>
            </div>
          </div>
          <Divider />
          <div className="container mx-auto">
            <div className="flex flex-col">
              <div className="flex lg:flex-row flex-col justify-between items-center mb-10 gap-4">
                <div className="text-3xl text-center md:text-left">
                  Start with one of our templates
                </div>
                <div className="hidden lg:block">
                  <GradientButton href="/templates" variant="soft">
                    <Image
                      alt="book cover"
                      src={Templates}
                      width={24}
                      height={24}
                    />
                    <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                      More templates
                    </span>
                  </GradientButton>
                </div>
              </div>
              <TemplateSearch
                templates={templates}
                searchEnabled={false}
                showButton={false}
                limit={6}
              />
              <div className="block lg:hidden mx-auto">
                <GradientButton href="/templates" variant="soft">
                  <Image
                    src={Templates}
                    alt="book cover"
                    width={24}
                    height={24}
                  />
                  <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                    More templates
                  </span>
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="container mx-auto">
          <div className="text-3xl mb-10 lg:text-left text-center">
            Integrations
          </div>
          <div className="flex flex-wrap flex-row gap-6 max-w-[936px] mx-auto justify-center">
            {integrations.map(({ name, icon, path }) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="flex flex-col lg:min-w-[216px] items-center"
                >
                  <div className="icon rounded-[20px] flex justify-center">
                    <Image
                      src={`/icons/${icon}`}
                      alt="book cover"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text=[18px]">{name}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <Divider />
        <div className="container mx-auto">
          <div className="flex flex-col">
            <div className="flex lg:flex-row flex-col justify-between items-center mb-10 gap-4">
              <div className="text-3xl">Learn from our tutorials</div>
              <div className="hidden lg:block">
                <GradientButton href="/templates" variant="soft">
                  <Image
                    src={Templates}
                    alt="book cover"
                    width={24}
                    height={24}
                  />
                  <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                    More tutorials
                  </span>
                </GradientButton>
              </div>
            </div>
            <TutorialList />
            <div className="lg:hidden flex justify-center">
              <div>
                <GradientButton href="/templates" variant="soft">
                  <Image
                    src={Templates}
                    alt="book cover"
                    width={24}
                    height={24}
                  />
                  <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                    More tutorials
                  </span>
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="container mx-auto">
          <div className="text-3xl text-center mb-10">
            Join the community to share and get help
          </div>
          <CommunityLinks />
        </div>
      </div>
    </Container>
  );
}

export const metadata = {
  title: "Documentation Database",
  description: "Serverless Postgres for modern SaaS",
  openGraph: {
    images: "opengraph/docs.jpg",
  },
  alternates: {
    canonical: `/docs`,
  },
};
