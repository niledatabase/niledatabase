import Image from 'next/image';
import queryTokens from '@/public/query-tokens.png';
import Container from '../_components/common/Container';
import PageHeader from '../_components/common/PageHeader';
import FAQ from './_components/FAQ';
import Divider from '../_components/common/Divider';
import TokenCost, { TableRow } from './_components/TokenCost';
import {
  SupportRow,
  ConsoleRow,
  DatabaseRow,
  UserManagementRow,
} from './_components/Rows';
import Pro from './_components/Pro';
import Scale from './_components/Scale';
import Free from './_components/Free';
import Enterprise from './_components/Enterprise';
import PlanPicker from './_components/PlanPicker';
import PricingCalculator from './_components/PricingCalculator';

const Line = ({
  text,
  children,
  hideDivider,
}: {
  text?: string;
  children?: JSX.Element | string;
  hideDivider?: boolean;
}) => (
  <>
    <div>
      <div className="leading-[20px] opacity-70">{text}</div>
      {children}
    </div>
    <div
      className={'h-px bg-white'}
      style={{ opacity: hideDivider ? 0 : 0.3 }}
    />
  </>
);

export default function Pricing() {
  return (
    <Container>
      <PageHeader
        titleClasses="mt-32"
        title="Start building B2B and AI apps with unlimited DBs"
        subtitle="Build and scale multi-tenant applications with Nile's Postgres"
        color="white"
      />
      <div className="container mx-auto">
        <div className="relative mt-56 flex w-full flex-col justify-center gap-20">
          <div>
            <div className="flex flex-col justify-center lg:flex-row 2xl:px-32">
              <div className="relative flex flex-1 flex-col rounded-lg border border-zinc-700 bg-black lg:flex-row">
                <div className="absolute -top-32 left-24 -z-10 hidden -rotate-[3deg] lg:flex">
                  <div className="gradientBorderGray w-[254px] rounded-[7px] bg-gradient px-6 py-11">
                    <div className="w-fit justify-center bg-gradient-text bg-clip-text text-[20px] text-transparent">
                      <div className="text-center">Unlimited Databases</div>
                      <div className="text-center">Unlimited Tenants</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-32 left-1/2 -z-10 hidden -translate-x-1/2 -rotate-[3deg] lg:flex">
                  <div className="gradientBorderGray w-[254px] rounded-[7px] bg-gradient px-6 py-11">
                    <div className="w-fit justify-center bg-gradient-text bg-clip-text text-[20px] text-transparent">
                      <div className="text-center">Pay for queries</div>
                      <div className="text-center">Not for instances</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-32 right-20 -z-10 hidden rotate-[3deg] lg:flex">
                  <div className="gradientBorderGray w-[254px] rounded-[7px] bg-gradient px-6 py-11">
                    <div className="w-fit justify-center bg-gradient-text bg-clip-text text-[20px] text-transparent">
                      <div className="text-center">Limitless vector</div>
                      <div className="text-center">embeddings</div>
                    </div>
                  </div>
                </div>
                <PlanPicker />
                <div className="hidden w-1/4 border-r border-r-zinc-700 lg:flex">
                  <div className="p-5">
                    <div className="pt-[240px] text-lg">
                      <DatabaseRow />
                    </div>
                    <div className="flex flex-col justify-center gap-4">
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
                      <Line text="Cross tenant analytics" />
                      <Line text="# of connections" />
                      <Line text="Connection pooling" />
                      <Line text="Workspace sharing" />
                      <Line text="No cold start" />
                      <Line text="Provisioned compute">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="Branching">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="DB Level backups">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="Tenant Level backups">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="Global Placement">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="SOC 2" hideDivider>
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <UserManagementRow />
                      <Line text="Number of active users" />
                      <Line text="Number of active tenants" />
                      <Line text="MAUs per tenant" />
                      <Line text="Social auth" />
                      <Line text="Magic auth" />
                      <Line text="Email verification" />
                      <Line text="Enterprise SAML">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="MFA">
                        <div className="mt-1 w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] text-transparent subpixel-antialiased">
                          Coming soon
                        </div>
                      </Line>
                      <Line text="Tenant overrides" hideDivider />
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
                    <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                      <div className="gradientButton !px-3 !py-0 font-semibold leading-[22px] after:rounded-full">
                        Recommended
                      </div>
                    </div>
                    <div className="border-gradient-color relative overflow-hidden border">
                      <div className="pointer-events-none absolute -top-7 left-1/2 h-32 w-5/6 -translate-x-1/2 -translate-y-3 bg-circular-blur opacity-40 blur-[40px]" />
                      <div className="relative z-10">
                        <Pro />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:flex lg:w-1/4">
                  <Scale />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden flex-col items-center justify-center gap-2 lg:flex lg:flex-row 2xl:px-32">
            <div className="gradientBorderGray flex w-full flex-row gap-36 border border-transparent p-10">
              <Enterprise />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="container mx-auto">
        <div className="pb-0 md:px-4 md:py-4 2xl:px-24 2xl:py-4">
          <div className="mb-24 flex flex-col items-start justify-center gap-2 lg:flex-row 2xl:px-24">
            <div className="lg:w-1/2">
              <div className="px-20">
                <Image
                  src={queryTokens}
                  alt="nile logo blue orange gradient with text background"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:w-1/2">
              <div className="w-fit bg-gradient-text bg-clip-text text-3xl text-transparent">
                What are query tokens?
              </div>
              <div className="text-[16px] opacity-70">
                Query tokens are abstract units of CPU and memory used when
                queries are executed on the serverless compute.
              </div>
              <div className="text-[16px] opacity-70">
                Currently, we support usage-based pricing and query tokens let
                you pay exactly for the resources a query took. The exact CPU
                and memory utilized by a query are abstracted, and users only
                need to care about query tokens, which normalize the resource
                consumed by queries executed on the serverless compute on Nile.
              </div>
            </div>
          </div>
          <PricingCalculator />
        </div>
      </div>
      <FAQ />
    </Container>
  );
}

export const metadata = {
  title: 'Pricing | Nile Database',
  description:
    'Launch your first SaaS application in days and grow your business',
  openGraph: {
    images: 'opengraph/pricing.jpg',
  },
};
