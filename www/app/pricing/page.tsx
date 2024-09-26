import Image from "next/image";
import queryTokens from "@/public/query-tokens.png";
import Container from "../_components/common/Container";
import PageHeader from "../_components/common/PageHeader";
import FAQ from "./_components/FAQ";
import Divider from "../_components/common/Divider";
import TokenCost, { TableRow } from "./_components/TokenCost";
import { SupportRow, ConsoleRow, DatabaseRow } from "./_components/Rows";
import Pro from "./_components/Pro";
import Scale from "./_components/Scale";
import Free from "./_components/Free";
import Enterprise from "./_components/Enterprise";
import PlanPicker from "./_components/PlanPicker";

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
      <div className="opacity-70 leading-[20px]">{text}</div>
      {children}
    </div>
    <div
      className={"h-px  bg-white"}
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
        <div className="flex w-full mt-56 justify-center flex-col  gap-20 relative">
          <div>
            <div className="flex-col lg:flex-row flex justify-center 2xl:px-32">
              <div className="flex flex-col lg:flex-row border rounded-lg border-zinc-700 bg-black relative flex-1">
                <div className="absolute -top-32 left-24 -z-10 -rotate-[3deg] hidden lg:flex">
                  <div className="gradientBorderGray w-[254px] bg-gradient py-11 px-6 rounded-[7px]">
                    <div className="bg-gradient-text bg-clip-text text-transparent text-[20px] w-fit justify-center">
                      <div className="text-center">Unlimited Databases</div>
                      <div className="text-center">Unlimited Tenants</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-32 left-1/2 -translate-x-1/2 -z-10 -rotate-[3deg] hidden lg:flex">
                  <div className="gradientBorderGray w-[254px] bg-gradient py-11 px-6 rounded-[7px]">
                    <div className="bg-gradient-text bg-clip-text text-transparent text-[20px] w-fit justify-center">
                      <div className="text-center">Pay for queries</div>
                      <div className="text-center">Not for instances</div>
                    </div>
                  </div>
                </div>
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
                      <Line text="Cross tenant analytics" />
                      <Line text="# of connections" />
                      <Line text="Connection pooling" />
                      <Line text="Workspace sharing" />
                      <Line text="No cold start" />
                      <Line text="Provisioned compute">
                        <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] mt-1">
                          Coming soon
                        </div>
                      </Line>
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
                      <Line text="Global Placement">
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
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-col lg:flex-row justify-center gap-2 items-center 2xl:px-32">
            <div className="border border-transparent flex flex-row w-full p-10 gap-36 gradientBorderGray">
              <Enterprise />
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="container mx-auto">
        <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
          <div className="flex flex-col lg:flex-row justify-center gap-2 items-start 2xl:px-24 mb-24">
            <div className="lg:w-1/2">
              <div className="px-20">
                <Image
                  src={queryTokens}
                  alt="nile logo blue orange gradient with text background"
                />
              </div>
            </div>
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
                col2="640K"
                col3="$0.030"
              />
              <TableRow
                col1="Reading one row of 256 bytes"
                col2="650K"
                col3="$0.032"
              />
              <TableRow
                col1="Reading one row of 1024 bytes"
                col2="680K"
                col3="$0.034"
              />
            </div>
            <div>
              <TokenCost header="Writing rows to a tenant" />
              <TableRow
                col1="Writing one row of 64 bytes"
                col2="1.4M"
                col3="$0.07"
              />
              <TableRow
                col1="Writing one row of 256 bytes"
                col2="1.45M"
                col3="$0.073"
              />
              <TableRow
                col1="Writing one row of 1024 bytes"
                col2="1.46M"
                col3="$0.074"
              />
            </div>
            <div>
              <TokenCost header="Scanning rows of a tenant" />
              <TableRow
                col1="Scanning 1000 rows of 64 bytes, return 1"
                col2="8.5M"
                col3="$0.42"
              />
              <TableRow
                col1="Scanning 1000 rows of 256 bytes, return 1"
                col2="8.8M"
                col3="$0.44"
              />
              <TableRow
                col1="Scanning 1000 rows of 1024 bytes, return 1"
                col2="9M"
                col3="$0.45"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <FAQ />
      </div>
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
