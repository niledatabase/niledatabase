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
        titleClasses="mt-32"
        title="Start building AI apps with unlimited DBs"
        subtitle="Build and scale multi-tenant AI applications with Nile's Postgres"
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
<<<<<<< HEAD
=======
            <div className="flex flex-col gap-4 lg:w-1/2">
              <div className="bg-gradient-text bg-clip-text text-transparent text-3xl w-fit">
                What are query tokens?
              </div>
              <div className="opacity-70 text-[16px]">
                Query tokens are abstract units of CPU and memory used when
                queries are executed on the serverless compute.
              </div>
              <div className="opacity-70 text-[16px]">
                Currently, we support usage-based pricing and query tokens let
                you pay exactly for the resources a query took. The exact CPU
                and memory utilized by a query are abstracted, and users only
                need to care about query tokens, which normalize the resource
                consumed by queries executed on the serverless compute on Nile.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <div>
              <TokenCost header="Reading rows from a tenant" />
              <TableRow
                col1="Reading one row of 64 bytes"
                col2="30"
                col3="$0.1"
              />
              <TableRow
                col1="Reading one row of 256 bytes"
                col2="30"
                col3="$0.1"
              />
              <TableRow
                col1="Reading one row of 1024 bytes"
                col2="30"
                col3="$0.1"
              />
            </div>
            <div>
              <TokenCost header="Writing rows to a tenant" />
              <TableRow
                col1="Writing one row of 64 bytes"
                col2="30"
                col3="$0.1"
              />
              <TableRow
                col1="Writing one row of 256 bytes"
                col2="30"
                col3="$0.1"
              />
              <TableRow
                col1="Writing one row of 1024 bytes"
                col2="30"
                col3="$0.1"
              />
            </div>
            <div>
              <TokenCost header="Scanning rows of a tenant" />
              <TableRow
                col1="Scanning 1000 rows of 64 bytes, return 1"
                col2="30"
                col3="$0.1"
              />
              <TableRow
                col1="Scanning 1000 rows of 256 bytes, return 1"
                col2="30"
                col3="$0.1"
              />
              <TableRow
                col1="Scanning 1000 rows of 1024 bytes, return 1"
                col2="30"
                col3="$0.1"
              />
            </div>
>>>>>>> 79bfee3 (more fixes)
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
