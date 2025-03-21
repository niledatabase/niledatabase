import Image from "next/image";
import fineGrainedBranching from "@/public/bottom-four/fine-grained-branching.svg";
import link1 from "@/public/bottom-four/link-1.svg";
import link2 from "@/public/bottom-four/link-2.svg";
import link3 from "@/public/bottom-four/link-3.svg";
import table1 from "@/public/bottom-four/table-1.svg";
import table2 from "@/public/bottom-four/table-2.svg";
import table3 from "@/public/bottom-four/table-3.svg";
import table4 from "@/public/bottom-four/table-4.svg";
import backups from "@/public/bottom-four/backups.svg";

import ChartHover from "./ChartHover";

import Box from "./Box";
import { NewHeading } from "../common/NewHeading";
export default function BottomFour() {
  return (
    <div className="container mx-auto mt-44 flex gap-16 flex-col">
      <div className="flex justify-center flex-col items-center">
        <NewHeading>
          Tenant-level branching, backups, schema migration, and insights
        </NewHeading>
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="w-full lg:w-1/2 lg:h-[640px] xl:h-[720px] mb-6">
          <div className="lg:pr-3 h-full">
            <Box
              title={["Fine grained", "branching"]}
              bullets={[
                "DB level and tenant-level branching",
                "Branch production data for testing",
                "Reproduce customer issues by branching specific tenant data",
              ]}
            >
              <Image src={fineGrainedBranching} alt="lines with dots" />
            </Box>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:h-[640px] xl:h-[720px] mb-6">
          <div className="lg:pl-3 h-full">
            <div className="relative h-full">
              <ChartHover />
              <Box
                title={["Instant customer", "dashboard"]}
                bullets={[
                  "Track growth of customers, embeddings and queries",
                  "Dive into per customer metrics",
                  "Manage user profiles for each customer",
                ]}
              >
                <div className="relative px-10 pb-10">
                  <div className="flex flex-col gap-14">
                    <div className="flex flex-row gap-2 items-center">
                      <div className="text-xs font-inter w-[32px] text-right">
                        1,950
                      </div>
                      <div className="border-b w-full opacity-10"></div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="text-xs font-inter w-[32px] text-right">
                        1,350
                      </div>
                      <div className="border-b w-full opacity-10"></div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="text-xs font-inter w-[32px]  text-right">
                        650
                      </div>
                      <div className="border-b w-full opacity-10"></div>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <div className="text-xs font-inter w-[32px] text-right">
                        0
                      </div>
                      <div className="border-b w-full opacity-10"></div>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:h-[720px] mb-3">
          <div className="lg:pr-3 h-full overflow-hidden">
            <Box
              title={["Automated schema migration across tenants"]}
              bullets={[
                "Execute DDL once across tenants",
                "Schema migrations are fully atomic",
                "Integrates with existing Postgres tooling",
              ]}
            >
              <div className="relative pl-10 pt-10 lg:pt-0 h-[255px] origin-top-left lg:origin-left scale-[0.534] md:scale-[0.634] lg:scale-[.74] xl:scale-[0.841] 2xl:scale-100">
                <div
                  className="absolute"
                  style={{
                    transform: "translate(0px, 186px)",
                  }}
                >
                  <Image src={table1} alt="graphs" />
                </div>
                <div>
                  <Image
                    className="absolute"
                    src={table2}
                    alt="graphs"
                    style={{
                      transform: "translate(420px, 44px)",
                    }}
                  />
                </div>
                <div className="absolute">
                  <Image
                    src={table3}
                    alt="graphs"
                    style={{
                      transform: "translate(420px, 210px)",
                    }}
                  />
                </div>
                <div className="absolute">
                  <Image src={table4} alt="graphs" />
                </div>
                <div className="absolute">
                  <Image
                    src={link1}
                    alt="graphs"
                    style={{
                      transform: "translate(320px, 120px)",
                    }}
                  />
                </div>
                <div className="absolute">
                  <Image
                    src={link2}
                    alt="graphs"
                    style={{
                      transform: "translate(322px, 50px)",
                    }}
                  />
                </div>
                <div className="absolute">
                  <Image
                    src={link3}
                    alt="graphs"
                    style={{
                      transform: "translate(386px, 128px)",
                    }}
                  />
                </div>
              </div>
            </Box>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:h-[720px] mb-3">
          <div className="lg:pl-3 h-full">
            <Box
              title={["Tenant-level backups for instant restores"]}
              bullets={[
                "Execute DDL once across tenants",
                "Schema migrations are fully atomic",
                "Integrates with existing Postgres tooling",
              ]}
            >
              <div className="flex items-center justify-center px-8">
                <Image src={backups} alt="linked databases invert" />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
