import Image from "next/image";
import Container from "../_components/common/Container";
import PageHeader from "../_components/common/PageHeader";
import FAQ from "./_components/FAQ";
import ContactUs from "./_components/ContactUs";
import JoinWaitlist from "./_components/JoinWaitlist";
import BulletIcon from "@/public/icons/bullet.svg";

function Bullet({ children }: { children: string | JSX.Element }) {
  return (
    <li className="flex flex-row gap-2">
      <Image
        src={BulletIcon}
        alt="gradient bullet"
        width={8}
        height={8}
        priority
      />
      <span className="opacity-60">{children}</span>
    </li>
  );
}
export default function Pricing() {
  return (
    <Container background="circular">
      <PageHeader
        titleClasses="mt-5"
        title="Build your modern Saas for free"
        subtitle="Launch your first SaaS application in days and grow your business"
        color="white"
      />
      <div className="flex w-full mt-20 justify-center">
        <div className="flex flex-col md:flex-row w-full justify-center gap-2 items-start">
          <div className="md:w-1/2 flex justify-end w-full">
            <div className="grayBorder rounded-[20px] w-100 md:w-auto flex-1 md:flex-grow-0">
              <div className="p-8 z-10 relative md:min-w-[392px] w-100 md:w-auto flex-1">
                <div className="bg-gradient-text bg-clip-text text-transparent text-[40px] leading-[48px] w-fit">
                  Free
                </div>
                <div className="bg-gradient-text bg-clip-text text-transparent text-[24px] leading-[32px] w-fit">
                  $0/month
                </div>
<<<<<<< HEAD
                <JoinWaitlist />
                <div className="opacity-60 text-lg">Limit of 10 databases</div>
                <div className="bg-divider-bold h-px my-6" />
                <div className="text-lg flex gap-4 flex-col">
                  <div className="opacity-60">Start your application with:</div>
                  <ul className="flex gap-4 flex-col">
                    <Bullet>Unlimited API Requests</Bullet>
                    <Bullet>Unlimited Users</Bullet>
                    <Bullet>Up to 100 Tenants per workspace</Bullet>
                    <Bullet>2B row reads/ month per workspace</Bullet>
                    <Bullet>20M row writes/ month per workspace</Bullet>
                    <Bullet>Up to 10GB of Storage per workspace</Bullet>
                    <Bullet>Social & Enterprise Auth</Bullet>
                    <Bullet>Community & email support</Bullet>
                  </ul>
=======
                <div className="absolute -top-32 right-20 -z-10 rotate-[3deg] hidden lg:flex">
                  <div className="gradientBorderGray w-[254px] bg-gradient py-11 px-6 rounded-[7px]">
                    <div className="bg-gradient-text bg-clip-text text-transparent text-[20px] w-fit justify-center">
                      <div className="text-center">Limitless vector</div>
                      <div className="text-center">embeddings</div>
                    </div>
                  </div>
                </div>
                <PlanPicker />
                <div className="border-r border-r-zinc-700 w-1/4 hidden lg:flex">
                  <div className="p-5">
                    <div className="pt-[240px] text-lg">
                      <DatabaseRow />
                    </div>
                    <div className="flex flex-col gap-4 justify-center">
                      <Line text="# of databases" />
                      <Line text="# of tenant DBs" />
                      <Line text="# of vector embeddings" />
                      <Line text="Tenant isolation" />
                      <Line>
                        <div className="leading-[44px] opacity-70">
                          Serverless compute
                        </div>
                      </Line>
                      <Line>
                        <div className="leading-[44px] opacity-70">Storage</div>
                      </Line>
                      <Line text="SLA" />
                      <Line text="Region availability" />
                      <Line text="Autoscaling" />
                      <Line text="# of connections" />
                      <Line text="Workspace sharing" />
                      <Line text="No cold start" />
                      <Line text="Branching">
                        <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] mt-1">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="DB Level backups">
                        <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] mt-1">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="Tenant Level backups">
                        <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] mt-1">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="SOC 2" hideDivider>
                        <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] mt-1">
                          Coming soon
                        </div>
                      </Line>
                      <ConsoleRow />
                      <Line text="Tenant overrides" />
                      <Line text="Tenant insights" />
                      <Line text="Tenant administration" />
                      <Line text="APIs" hideDivider />
                      <SupportRow />
                      <Line text="Community" />
                      <Line text="Email" />
                      <Line text="Email with SLA" />
                      <Line text="Designated" hideDivider />
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex lg:w-1/4">
                  <Free />
                </div>
                <div className="hidden lg:flex lg:w-1/4">
                  <div className="relative w-full">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <div className="gradientButton after:rounded-full !py-0 !px-3 leading-[22px] font-semibold">
                        Recommended
                      </div>
                    </div>
                    <div className="border border-gradient-color relative overflow-hidden">
                      <div className="w-5/6 h-32 -top-7 absolute pointer-events-none left-1/2 -translate-x-1/2 bg-circular-blur -translate-y-3 blur-[40px] opacity-40" />
                      <div className="relative z-10">
                        <Pro />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex lg:w-1/4">
                  <Scale />
>>>>>>> 821f0c3 (some changes to pricing)
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-start w-full">
            <div className="grayBorder rounded-[20px] w-full md:w-auto">
              <div className="p-8 z-10 relative md:min-w-[392px] w-100 md:w-auto flex-1">
                <div className="bg-gradient-text bg-clip-text text-transparent text-[40px] leading-[48px] w-fit">
                  Custom
                </div>
                <div className="bg-gradient-text bg-clip-text text-transparent text-[24px] leading-[32px] w-fit">
                  Contact Us
                </div>
                <div className="my-[24px]">
                  <ContactUs />
                </div>
                <div className="opacity-60 text-lg">Unlimited databases</div>
                <div className="bg-divider-bold h-px my-6" />
                <div className="text-lg flex gap-4 flex-col">
                  <div className="opacity-60">Start your application with:</div>
                  <ul className="flex gap-4 flex-col">
                    <Bullet>Custom pricing</Bullet>
                    <Bullet>Volume discounts</Bullet>
                    <Bullet>Unlimited connections</Bullet>
                    <Bullet>Private Slack channel</Bullet>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
    </Container>
  );
}

export const metadata = {
  title: "Pricing | Nile Database",
  description:
    "Launch your first SaaS application in days and grow your business",
  openGraph: {
    images: "opengraph/pricing.jpg",
  },
};
