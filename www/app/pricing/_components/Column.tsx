import React from "react";
import Image from "next/image";
import check from "@/public/icons/check.svg";
import Indicator, { NotApplicable } from "./Indicator";
import { TableDivider } from "./Rows";

export const Line = ({
  text,
  header,
}: {
  header: string;
  text: void | string | null;
}) => (
  <>
    <div className="leading-[20px] flex flex-row lg:justify-center justify-between">
      <div className="opacity-70 lg:hidden">{header}</div>
      {text ?? (
        <div className="flex align-center justify-center">
          <div className="bg-gray rounded-full w-5 h-5 text-slate-950 text-[20px] font-bold leading-[19px] text-center">
            -
          </div>
        </div>
      )}
    </div>
    <div className={"h-px opacity-30 bg-white"} />
  </>
);

const DoubleHeightIndicator = ({
  value,
  header,
  hideDivider,
}: {
  value: boolean;
  hideDivider?: boolean;
  header: JSX.Element | string;
}) => {
  return (
    <>
      <div className="flex align-center justify-between lg:justify-center py-3">
        <div className="lg:hidden">{header}</div>
        {value ? (
          <div className="bg-orange rounded-full flex align-center justify-center">
            <Image src={check} alt="check" width={20} height={20} />
          </div>
        ) : (
          <NotApplicable />
        )}
      </div>
      <div
        className={"h-px  bg-white hidden lg:flex"}
        style={{ opacity: hideDivider ? 0 : 0.3 }}
      />
    </>
  );
};

const DoubleHeight = ({
  text,
  header,
}: {
  header: JSX.Element | string;
  text: void | null | string;
}) => {
  return (
    <>
      <div className="flex items-center justify-between lg:justify-center leading-[44px]">
        <div className="lg:hidden">{header}</div>
        {text ?? (
          <div className="flex align-center justify-center py-[12px]">
            <NotApplicable />
          </div>
        )}
      </div>
      <div className={"h-px opacity-30 bg-white"} />
    </>
  );
};

export const DoubleLine = ({
  text,
  lower,
  header,
}: {
  text: string;
  lower: string;
  header: string;
}) => (
  <>
    <div className="flex flex-row items-center justify-between lg:justify-center">
      <div className="opacity-70 lg:hidden">{header}</div>
      <div className="flex flex-col gap-1">
        <div className="whitespace-nowrap text-right lg:text-center leading-[20px]">
          {text}
        </div>
        <div className="whitespace-nowrap text-right lg:text-center opacity-70 leading-[20px]">
          {lower}
        </div>
      </div>
    </div>
    <div className={"h-px opacity-30 bg-white"} />
  </>
);
type Props = {
  tier: string;
  price: number;
  tierSizzle: string;
  computeTop: string;
  computeSub: string;
  storageTop: string;
  storageSub: string;
  startButton: JSX.Element;
  databases?: string;
  tenants?: string;
  vectors?: string;
  isolation?: boolean;
  sla?: string;
  dbBack?: string | null;
  tenantBack?: string | null;
  regionAvailable?: string;
  autoscale?: boolean;
  connections: string;
  sharing?: boolean;
  noColdStart?: boolean;
  branches: string;
  provisionedcompute?: string;
  crosstenantanalytics?: boolean;
  globalplacement:string;
  soc2?: boolean;
  tenantOverrides?: boolean;
  tenantInsights: string;
  tenantAdministration?: boolean;
  tenantApis?: boolean;
  emailSla?: boolean;
  designated?: boolean;
};
export default function Column(props: Props) {
  const {
    tier,
    price,
    tierSizzle,
    startButton,
    databases = "Unlimited",
    tenants = "Unlimited",
    vectors = "Unlimited",
    isolation = true,
    computeTop,
    computeSub,
    storageTop,
    storageSub,
    sla,
    dbBack,
    tenantBack,
    regionAvailable = "All",
    autoscale = true,
    crosstenantanalytics = true,
    connections,
    sharing = false,
    noColdStart = true,
    branches,
    provisionedcompute,
    globalplacement,
    soc2 = false,
    tenantOverrides = true,
    tenantInsights,
    tenantAdministration = true,
    tenantApis = true,
    emailSla = false,
    designated = false,
  } = props;
  return (
    <div className="p-5 w-full">
      <div className="flex justify-center">
        <div className="bg-gradient-text bg-clip-text text-transparent text-2xl w-fit">
          {tier}
        </div>
      </div>
      <div className="flex flex-col gap-7 lg:gap-14">
        <div className="relative w-full">
          <div className="opacity-70 leading-[16px] text-[16px] text-center lg:absolute">
            {tierSizzle}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col gap-7 w-full">
            <div className="flex flex-row gap-2 items-end justify-center">
              <div className="bg-gradient-text bg-clip-text text-transparent text-[40px] leading-[48px] w-fit">
                ${price}
              </div>
              <span className="opacity-70 text-base pb-1">
                {price > 0 ? "/ month" : ""}
              </span>
            </div>
            {startButton}
            <div className="flex lg:hidden bg-divider-bold h-px my-8 mb-8" />
          </div>
        </div>
      </div>
      <TableDivider mobile="database">
        <div className="hidden lg:flex bg-divider-bold h-px mb-[33px] mt-14" />
      </TableDivider>
      <div className="flex flex-col gap-4 justify-center">
        <Line text={databases} header="# of databases" />
        <Line text={tenants} header="# of tenant DBs" />
        <Line text={vectors} header="# of vector embeddings" />
        <Indicator value={isolation} header="Tenant isolation" />
        <DoubleLine
          text={computeTop}
          lower={computeSub}
          header="Serverless compute"
        />
        <DoubleLine text={storageTop} lower={storageSub} header="Storage" />
        <Line text={sla} header="SLA" />
        <Line text={regionAvailable} header="Region availability" />
        <Indicator value={autoscale} header="Autoscaling" />
        <Indicator value={crosstenantanalytics} header="Crosstenantanalytics" />
        <Line text={connections} header="# of connections" />
        <Indicator value={sharing} header="Workspace sharing" />
        <Indicator value={noColdStart} header="No cold start" />
        <DoubleHeight
          text={provisionedcompute}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">Provisioned Compute</div>
              <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] leading-[22px]">
                Coming soon
              </div>
            </div>
          }
        />
        <DoubleHeight
          text={branches}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">Branching</div>
              <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] leading-[22px]">
                Coming soon
              </div>
            </div>
          }
        />
        <DoubleHeight
          text={dbBack}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">DB level backups</div>
              <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] leading-[22px]">
                Coming soon
              </div>
            </div>
          }
        />
        <DoubleHeight
          text={tenantBack}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">Tenant level backups</div>
              <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] leading-[22px]">
                Coming soon
              </div>
            </div>
          }
        />
        <DoubleHeight
          text={globalplacement}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">Global placement</div>
              <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] leading-[22px]">
                Coming soon
              </div>
            </div>
          }
        />
        <DoubleHeightIndicator
          value={soc2}
          hideDivider
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">SOC 2</div>
              <div className="w-fit bg-gradient-white bg-clip-text text-transparent subpixel-antialiased border border-zinc-700 px-1.5 rounded-md text-[12px] leading-[22px]">
                Coming soon
              </div>
            </div>
          }
        />
        <TableDivider mobile="console">
          <div className="hidden lg:flex bg-divider-bold h-px my-6 mb-8" />
        </TableDivider>
        <Indicator value={tenantOverrides} header="Tenant overrides" />
        <Line text={tenantInsights} header="Tenant insights" />
        <Indicator
          value={tenantAdministration}
          header="Tenant administration"
        />
        <Indicator value={tenantApis} hideDivider header="APIs" />
        <TableDivider mobile="support">
          <div className="hidden lg:flex bg-divider-bold h-px my-8 mb-8" />
        </TableDivider>
        <Indicator value={true} header="Community" />
        <Indicator value={true} header="Email" />
        <Indicator value={emailSla} header="Email with SLA" />
        <Indicator value={designated} hideDivider={true} header="Designated" />
        {startButton}
      </div>
    </div>
  );
}
