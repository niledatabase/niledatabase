import Container from '../_components/common/Container';
import { HeroBottom } from '../_components/common/Hero';
import arrow from '@/public/icons/arrow.svg';
import Image from 'next/image';
import Logo from '@/public/githubLogo.svg';
import Link from 'next/link';
import MultiTenantCodeEditor, {
  setupCodeExamples,
  socialLoginExamples,
  databaseExamples,
  selfHostExamples,
  authExamples,
} from './MultiTenantCodeEditor';
import VideoEmbed from './VideoEmbed';
import AuthCalculator from './_components/AuthPricingCalculator';

export default function Auth() {
  return (
    <Container background={null}>
      <div className="container mx-auto">
        <div className="py-32 pb-10 sm:px-4 md:px-12 md:py-24 xl:px-24 xl:py-48">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
            <div className="flex flex-col gap-8 lg:w-1/2">
              <h1 className="flex flex-col text-[42px] leading-[42px] lg:text-[96px] lg:leading-[96px]">
                <span>Auth for</span>
                <div className="flex flex-row items-baseline whitespace-nowrap">
                  <span className="overflow-hidden whitespace-nowrap bg-black bg-gradient-text bg-clip-text font-bold leading-[48px] text-transparent subpixel-antialiased lg:leading-[120px]">
                    B2B
                  </span>
                  <span className="ml-3">apps</span>
                </div>
              </h1>
              <h2 className="w-full text-[16px] leading-[16px] xl:text-[20px] xl:leading-[20px]">
                Multi-tenant, open source, unlimited active users, customer data
                in your Postgres, drop-in customizable UI modules
              </h2>
              <div className="flex flex-row items-center gap-4">
                <Link href="https://console.thenile.dev/" target="_blank">
                  <button className="flex h-11 flex-row items-center gap-2 rounded-[10px] bg-blue px-4 py-2 text-[16px] leading-[20px] text-black transition-colors">
                    Build for free
                    <Image
                      className="-ml-1 invert"
                      src={arrow}
                      alt="arrow"
                      width={16}
                      height={16}
                    />
                  </button>
                </Link>
                <ViewOnGithub />
              </div>
            </div>
            <div className="lg:w-1/2">
              <MultiTenantCodeEditor
                tabs={setupCodeExamples}
                defaultTab="nile.ts"
              />
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex flex-col justify-center gap-16">
            <div className="flex w-full flex-col items-center justify-center">
              <h2 className="w-5/6 text-left text-[42px] leading-[42px] -tracking-[0.64px] lg:text-center lg:text-[50px] lg:leading-[50px] xl:text-[64px] xl:leading-[64px] 2xl:w-2/3">
                Built for startups and enterprise
              </h2>
            </div>
            <div className="flex flex-col gap-16">
              <div className="flex flex-col items-start justify-center gap-16 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="group min-h-[216px] max-w-[472px] transition-all">
                    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col !justify-between bg-[#000000] p-6">
                      <div className="flex items-center gap-2">
                        <div className="brightness-100 transition-all duration-700">
                          {cards[0].icon}
                        </div>
                        <div className="bg-gradient-text bg-clip-text text-[24px] font-medium leading-[24px] text-transparent brightness-100 duration-700">
                          {cards[0].title}
                        </div>
                      </div>

                      <div className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:leading-[18px] xl:text-[18px] xl:leading-[24px]">
                        {cards[0].subTitle}
                      </div>
                      <Link
                        className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px]"
                        href="http://thenile.dev/docs/auth/concepts/tenants"
                      >
                        <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#fff]">
                          Learn more
                          <Image
                            src={arrow}
                            alt="arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <MultiTenantCodeEditor />
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#333333]" />

              {/* Second row */}
              <div className="flex flex-col items-start justify-center gap-16 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="group min-h-[216px] max-w-[472px] transition-all">
                    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col !justify-between bg-[#000000] p-6">
                      <div className="flex items-center gap-2">
                        <div className="brightness-100 transition-all duration-700">
                          {cards[2].icon}
                        </div>
                        <div className="bg-gradient-text bg-clip-text text-[24px] font-medium leading-[24px] text-transparent brightness-100 duration-700">
                          {cards[2].title}
                        </div>
                      </div>

                      <div className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:leading-[18px] xl:text-[18px] xl:leading-[24px]">
                        {cards[2].subTitle}
                      </div>
                      <Link
                        className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px]"
                        href="https://www.thenile.dev/pricing"
                      >
                        <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#fff]">
                          Learn more
                          <Image
                            src={arrow}
                            alt="arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:-ml-16 lg:w-1/2">
                  <AuthCalculator />
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#333333]" />

              {/* Third row - User data stored in your DB */}
              <div className="flex flex-col items-start justify-center gap-16 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="group min-h-[216px] max-w-[472px] transition-all">
                    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col !justify-between bg-[#000000] p-6">
                      <div className="flex items-center gap-2">
                        <div className="brightness-100 transition-all duration-700">
                          {cards[1].icon}
                        </div>
                        <div className="bg-gradient-text bg-clip-text text-[24px] font-medium leading-[24px] text-transparent brightness-100 duration-700">
                          {cards[1].title}
                        </div>
                      </div>

                      <div className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:leading-[18px] xl:text-[18px] xl:leading-[24px]">
                        {cards[1].subTitle}
                      </div>
                      <Link
                        className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px]"
                        href="http://thenile.dev/docs/auth/concepts/builtintables"
                      >
                        <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#fff]">
                          Learn more
                          <Image
                            src={arrow}
                            alt="arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <MultiTenantCodeEditor
                    tabs={databaseExamples}
                    defaultTab="tenants"
                  />
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#333333]" />

              {/* Fourth row - Comprehensive auth features */}
              <div className="flex flex-col items-start justify-center gap-16 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="group min-h-[216px] max-w-[472px] transition-all">
                    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col !justify-between bg-[#000000] p-6">
                      <div className="flex items-center gap-2">
                        <div className="brightness-100 transition-all duration-700">
                          {cards[3].icon}
                        </div>
                        <div className="bg-gradient-text bg-clip-text text-[24px] font-medium leading-[24px] text-transparent brightness-100 duration-700">
                          {cards[3].title}
                        </div>
                      </div>

                      <div className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:leading-[18px] xl:text-[18px] xl:leading-[24px]">
                        {cards[3].subTitle}
                      </div>
                      <Link
                        className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px]"
                        href="http://thenile.dev/docs/auth/introduction#comprehensive-auth-features"
                      >
                        <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#fff]">
                          Learn more
                          <Image
                            src={arrow}
                            alt="arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <MultiTenantCodeEditor
                    tabs={authExamples}
                    defaultTab="users"
                  />
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#333333]" />

              {/* Fifth row - Self hosted */}
              <div className="flex flex-col items-start justify-center gap-16 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="group min-h-[216px] max-w-[472px] transition-all">
                    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col !justify-between bg-[#000000] p-6">
                      <div className="flex items-center gap-2">
                        <div className="brightness-100 transition-all duration-700">
                          {cards[4].icon}
                        </div>
                        <div className="bg-gradient-text bg-clip-text text-[24px] font-medium leading-[24px] text-transparent brightness-100 duration-700">
                          {cards[4].title}
                        </div>
                      </div>

                      <div className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:leading-[18px] xl:text-[18px] xl:leading-[24px]">
                        {cards[4].subTitle}
                      </div>
                      <Link
                        className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px]"
                        href="http://thenile.dev/docs/auth/quickstart"
                      >
                        <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#fff]">
                          Learn more
                          <Image
                            src={arrow}
                            alt="arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <MultiTenantCodeEditor
                    tabs={selfHostExamples}
                    defaultTab="managed"
                  />
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#333333]" />

              {/* Sixth row - Drop-in Auth UI Modules */}
              <div className="flex flex-col items-start justify-center gap-16 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="group min-h-[216px] max-w-[472px] transition-all">
                    <div className="flex h-full min-h-[216px] max-w-[472px] flex-1 flex-col !justify-between bg-[#000000] p-6">
                      <div className="flex items-center gap-2">
                        <div className="brightness-100 transition-all duration-700">
                          {cards[5].icon}
                        </div>
                        <div className="bg-gradient-text bg-clip-text text-[24px] font-medium leading-[24px] text-transparent brightness-100 duration-700">
                          {cards[5].title}
                        </div>
                      </div>

                      <div className="text-[14px] font-normal leading-[20px] lg:text-[16px] lg:leading-[18px] xl:text-[18px] xl:leading-[24px]">
                        {cards[5].subTitle}
                      </div>
                      <Link
                        className="flex flex-row items-center gap-2 text-[16px] font-medium leading-[24px]"
                        href="http://thenile.dev/docs/auth/singlesignon/google"
                      >
                        <div className="flex flex-row items-center gap-2 border-b border-b-transparent transition-colors hover:border-b-[#fff]">
                          Learn more
                          <Image
                            src={arrow}
                            alt="arrow"
                            width={24}
                            height={24}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <MultiTenantCodeEditor
                    tabs={socialLoginExamples}
                    defaultTab="google"
                  />
                </div>
              </div>

              <div className="h-[1px] w-full bg-[#333333]" />
            </div>
          </div>
        </div>
      </div>
      <HeroBottom
        cta={
          <div className="flex w-fit flex-row items-center gap-2 rounded-xl bg-black px-4 py-1 text-white">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="shrink-0 flex-row text-[24px] leading-[28px] lg:text-[48px] lg:leading-[52px]">
              Nile auth
            </div>
          </div>
        }
      />
    </Container>
  );
}

function ViewOnGithub() {
  return (
    <Link
      href={'https://github.com/niledatabase/nile-auth'}
      target="_blank"
      className="github shrink-0"
    >
      <button className="rounded-[10px] border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c]">
        <div className="flex flex-row items-center gap-[10px] px-4 py-3">
          <span className="whitespace-nowrap">View on GitHub</span>
          <Image src={Logo} alt="Github Logo" width={20} height={20} />
        </div>
      </button>
    </Link>
  );
}

const cards = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#paint0_linear_4824_6139)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <defs>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="paint0_linear_4824_6139"
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4C587" />
            <stop offset="0.5" stopColor="#D6D3E9" />
            <stop offset="1" stopColor="#99D2EC" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Purpose-built for multi-tenant apps',
    subTitle:
      'Designed from the ground up to support multi-tenant applications. Manage tenants, invite users to tenants, override tenant specific settings, and more.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#paint0_linear_4824_6139)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
        <defs>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="paint0_linear_4824_6139"
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4C587" />
            <stop offset="0.5" stopColor="#D6D3E9" />
            <stop offset="1" stopColor="#99D2EC" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'User data stored in your DB',
    subTitle:
      'Keep full control of your user data by storing it directly in your own database. Your customer data is strongly consistent with no synchronization needs',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#paint0_linear_4824_6139)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <defs>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="paint0_linear_4824_6139"
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4C587" />
            <stop offset="0.5" stopColor="#D6D3E9" />
            <stop offset="1" stopColor="#99D2EC" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Unlimited active users',
    subTitle:
      'Scale your application with confidence. Supports unlimited active users at no additional cost. Pay only for the database usage.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#paint0_linear_4824_6139)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <defs>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="paint0_linear_4824_6139"
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4C587" />
            <stop offset="0.5" stopColor="#D6D3E9" />
            <stop offset="1" stopColor="#99D2EC" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Comprehensive auth features',
    subTitle:
      'Access a full suite of authentication features to secure your application thoroughly. Includes email/password, session management, social login, and more to come.',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#paint0_linear_4824_6139)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
        <defs>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="paint0_linear_4824_6139"
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4C587" />
            <stop offset="0.5" stopColor="#D6D3E9" />
            <stop offset="1" stopColor="#99D2EC" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Self host or let Nile manage it',
    subTitle:
      "Choose between Nile's managed solution or self-host for complete control. Build your app locally during development and switch to managed solution for production.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#paint0_linear_4824_6139)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
        <defs>
          <linearGradient
            xmlns="http://www.w3.org/2000/svg"
            id="paint0_linear_4824_6139"
            x1="0"
            y1="0"
            x2="24"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4C587" />
            <stop offset="0.5" stopColor="#D6D3E9" />
            <stop offset="1" stopColor="#99D2EC" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Drop-in auth UI modules',
    subTitle:
      'Easily integrate pre-built authentication UI modules into your application in five minutes. Add support for Google, GitHub, and more and override per-tenant.',
  },
];

import { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Auth for B2B Apps | Multi-tenant, unlimited active users, open source',
  description:
    "Nile Auth is a comprehensive B2B auth solution explicitly designed for multi-tenant applications. Nile Auth is fully open source and built on top of Nile's Postgres. It allows you to store user and customer data in your Postgres database, giving you complete control over your information. You can choose to self-host Nile Auth or utilize the cloud version.",
  keywords:
    'PostgreSQL, Multi-tenant, open source, unlimited active users, customer data in your Postgres, drop-in customizable UI modules',
  openGraph: {
    title:
      'Auth for B2B Apps | Multi-tenant, unlimited active users, open source',
    description:
      "Nile Auth is a comprehensive B2B auth solution explicitly designed for multi-tenant applications. Nile Auth is fully open source and built on top of Nile's Postgres. It allows you to store user and customer data in your Postgres database, giving you complete control over your information. You can choose to self-host Nile Auth or utilize our cloud version.",
    url: 'https://thenile.dev/auth',
    images: 'https://thenile.dev/opengraph/auth.jpg',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Auth for B2B Apps | Multi-tenant, unlimited active users, open source',
    description:
      "Nile Auth is a comprehensive B2B auth solution explicitly designed for multi-tenant applications. Nile Auth is fully open source and built on top of Nile's Postgres. It allows you to store user and customer data in your Postgres database, giving you complete control over your information. You can choose to self-host Nile Auth or utilize our cloud version.",
    images: 'https://thenile.dev/opengraph/auth.jpg',
  },
};
