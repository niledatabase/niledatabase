import Image from "next/image";
import check from "@/public/icons/check.svg";
import fineGrainedBranching from "@/public/bottom-four/fine-grained-branching.svg";
import instantDashboards from "@/public/bottom-four/instant-dashboards.svg";
import link1 from "@/public/bottom-four/link-1.svg";
import link2 from "@/public/bottom-four/link-2.svg";
import link3 from "@/public/bottom-four/link-3.svg";
import table1 from "@/public/bottom-four/table-1.svg";
import table2 from "@/public/bottom-four/table-2.svg";
import table3 from "@/public/bottom-four/table-3.svg";
import table4 from "@/public/bottom-four/table-4.svg";
import backups from "@/public/bottom-four/backups.svg";

type Props = {
  title: string[];
  bullets: string[];
  children: JSX.Element;
};
function Box(props: Props) {
  const { title, bullets, children } = props;
  return (
    <div className="flex flex-col bg-darkGray rounded-lg pl-4 pt-4 pb-4 lg:pl-10 lg:pt-10 lg:pb-10 h-full justify-between">
      <div className="inline-flex lg:block gap-2 w-5/6">
        {title.map((item) => {
          return (
            <div
              key={item}
              className="text-[24px] leading-[28px] lg:text-[42px] lg:leading-[42px]"
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="overflow-hidden">{children}</div>
      <div className="flex flex-col gap-3 lg:gap-6">
        {bullets.map((bullet) => {
          return (
            <div key={bullet} className="flex flex-row gap-4 items-start w-5/6">
              <div className="shrink-0">
                <Image alt="check mark" src={check}></Image>
              </div>
              <div className="font-medium leading-[17px]">{bullet}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default function BottomFour() {
  return (
    <div className="container mx-auto mt-44 flex gap-16 flex-col">
      <div className="flex justify-center flex-col items-center">
        <div className="text-[32px] leading-[32px] lg:text-[64px] lg:leading-[64px] text-center w-5/6">
          Tenant-level branching, backups, schema migration, and insights
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="w-full lg:w-1/2 h-[380px] lg:h-[720px] mb-3">
          <div className="lg:pr-1.5 h-full">
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
        <div className="w-full lg:w-1/2 h-[380px] lg:h-[720px] mb-3">
          <div className="lg:pl-1.5 h-full">
            <Box
              title={["Instance customer", "dashboard"]}
              bullets={[
                "Track growth of customers, embeddings and queries",
                "Dive into per customer metrics",
                "Manage user profiles for each customer",
              ]}
            >
              <Image src={instantDashboards} alt="graphs" />
            </Box>
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-[380px] lg:h-[720px] mb-3">
          <div className="lg:pr-1.5 h-full overflow-hidden">
            <Box
              title={["Automated schema migration across tenants"]}
              bullets={[
                "Execute DDL once across tenants",
                "Schema migrations are fully atomic",
                "Integrates with existing Postgres tooling",
              ]}
            >
              <div className="relative pt-10 lg:pt-0 pb-96 origin-top-left lg:origin-left scale-[0.534] md:scale-[0.634] lg:scale-[.74] xl:scale-[0.841] 2xl:scale-100">
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
        <div className="w-full lg:w-1/2 h-[380px] lg:h-[720px] mb-3">
          <div className="lg:pl-1.5 h-full">
            <Box
              title={["Tenant-level backups for instant restores"]}
              bullets={[
                "Execute DDL once across tenants",
                "Schema migrations are fully atomic",
                "Integrates with existing Postgres tooling",
              ]}
            >
              <div className="flex items-center justify-center px-8">
                <Image src={backups} alt="linked databases" />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}
