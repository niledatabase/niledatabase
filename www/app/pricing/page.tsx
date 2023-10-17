import Image from "next/image";
import Container from "../_components/common/Container";
import PageHeader from "../_components/common/PageHeader";
import FAQ from "./_components/FAQ";
import ContactUs from "./_components/ContactUs";
import JoinWaitlist from "./_components/JoinWaitlist";

function Bullet({ children }: { children: string | JSX.Element }) {
  return (
    <li className="flex flex-row gap-2">
      <Image
        src="/icons/bullet.svg"
        alt="gradient bullet"
        width={8}
        height={8}
        priority
      />
      <span className="opacity-80">{children}</span>
    </li>
  );
}
export default function Pricing() {
  return (
    <Container background="circular">
      <PageHeader
        titleClasses="mt-5"
        title="Build your modern Saas for free"
        subtitle="Join the Nile community to learn, share and collaborate with thousands of other developers: Together, we will build the best platform to build and accelerate SaaS"
        color="white"
      />
      <div className="flex w-full mt-20 justify-center">
        <div className="flex flex-col lg:flex-row w-full justify-center lg:gap-0 gap-2 items-start">
          <div className="md:w-1/2 flex lg:justify-end">
            <div className="mr-2">
              <div className="grayBorder rounded-[20px] lg:min-w-[392px]">
                <div className="p-8 z-10 relative">
                  <div className="bg-gradient-text bg-clip-text text-transparent text-[40px] leading-[48px] w-fit">
                    Free
                  </div>
                  <div className="bg-gradient-text bg-clip-text text-transparent text-[24px] leading-[32px] w-fit">
                    $0/month
                  </div>

                  <button className="flex flex-row gap-2 text-[16px] gradientButton my-[24px] leading-[24px] after:rounded-[12px] px-1 w-full !justify-between">
                    <span>Join the waitlist</span>
                    <Image
                      className="invert"
                      src="/icons/arrow.svg"
                      alt="arrow"
                      width={25}
                      height={30}
                      priority
                    />
                  </button>
                  <div className="opacity-80 text-lg">Limit of 10 databases</div>

                  <JoinWaitlist />
                  <div className="opacity-60 text-lg">
                    Limit of 10 databases
                  </div>

                  <div className="bg-divider-bold h-px my-6" />
                  <div className="text-lg flex gap-4 flex-col">
                    <div className="opacity-80">
                      Start your application with:
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-start">
            <div className="grayBorder rounded-[20px] lg:min-w-[392px]">
              <div className="p-8 z-10 relative">
                <div className="bg-gradient-text bg-clip-text text-transparent text-[40px] leading-[48px] w-fit">
                  Custom
                </div>
                <div className="bg-gradient-text bg-clip-text text-transparent text-[24px] leading-[32px] w-fit">
                  Contact Us
                </div>
                <div className="my-[24px]">
                  <ContactUs />
                </div>
                <div className="opacity-80 text-lg">Unlimited databases</div>
                <div className="bg-divider-bold h-px my-6" />
                <div className="text-lg flex gap-4 flex-col">
                  <div className="opacity-80">Start your application with:</div>
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
