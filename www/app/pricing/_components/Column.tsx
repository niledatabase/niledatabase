import React from 'react';
import Image from 'next/image';
import check from '@/public/icons/check.svg';
import Indicator, { NotApplicable } from './Indicator';
import { TableDivider } from './Rows';

export const Line = ({
  text,
  header,
}: {
  header: string;
  text: void | string | null;
}) => (
  <>
    <div className="flex flex-row justify-between leading-[20px] lg:justify-center">
      <div className="opacity-70 lg:hidden">{header}</div>
      {text ?? (
        <div className="align-center flex justify-center">
          <div className="h-5 w-5 rounded-full bg-gray text-center text-[20px] font-bold leading-[19px] text-slate-950">
            -
          </div>
        </div>
      )}
    </div>
    <div className={'h-px bg-white opacity-30'} />
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
      <div className="align-center flex justify-between py-3 lg:justify-center">
        <div className="lg:hidden">{header}</div>
        {value ? (
          <div className="align-center flex justify-center rounded-full bg-orange">
            <Image src={check} alt="check" width={20} height={20} />
          </div>
        ) : (
          <NotApplicable />
        )}
      </div>
      <div
        className={'hidden h-px bg-white lg:flex'}
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
      <div className="flex items-center justify-between leading-[44px] lg:justify-center">
        <div className="lg:hidden">{header}</div>
        {text ?? (
          <div className="align-center flex justify-center py-[12px]">
            <NotApplicable />
          </div>
        )}
      </div>
      <div className={'h-px bg-white opacity-30'} />
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
        <div className="whitespace-nowrap text-right leading-[20px] lg:text-center">
          {text}
        </div>
        <div className="whitespace-nowrap text-right leading-[20px] opacity-70 lg:text-center">
          {lower}
        </div>
      </div>
    </div>
    <div className={'h-px bg-white opacity-30'} />
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
  pooling?: boolean;
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
  globalplacement: string;
  soc2?: boolean;
  tenantOverrides?: boolean;
  tenantInsights: string;
  tenantAdministration?: boolean;
  tenantApis?: boolean;
  emailSla?: boolean;
  designated?: boolean;
  enterpriseSaml?: boolean;
  mfa?: boolean;
};
export default function Column(props: Props) {
  const {
    tier,
    price,
    tierSizzle,
    startButton,
    databases = 'Unlimited',
    tenants = 'Unlimited',
    vectors = 'Unlimited',
    isolation = true,
    pooling = true,
    computeTop,
    computeSub,
    storageTop,
    storageSub,
    sla,
    dbBack,
    tenantBack,
    regionAvailable = 'All',
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
    enterpriseSaml = true,
    mfa = true,
  } = props;
  return (
    <div className="w-full p-5">
      <div className="flex justify-center">
        <div className="w-fit bg-gradient-text bg-clip-text text-2xl text-transparent">
          {tier}
        </div>
      </div>
      <div className="flex flex-col gap-7 lg:gap-14">
        <div className="relative w-full">
          <div className="text-center text-[16px] leading-[16px] opacity-70 lg:absolute">
            {tierSizzle}
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full flex-col gap-7">
            <div className="flex flex-row items-end justify-center gap-2">
              <div className="w-fit bg-gradient-text bg-clip-text text-[40px] leading-[48px] text-transparent">
                ${price}
              </div>
              <span className="pb-1 text-base opacity-70">
                {price > 0 ? '/ month' : ''}
              </span>
            </div>
            {startButton}
            <div className="my-8 mb-8 flex h-px bg-divider-bold lg:hidden" />
          </div>
        </div>
      </div>
      <TableDivider mobile="database">
        <div className="mb-[33px] mt-14 hidden h-px bg-divider-bold lg:flex" />
      </TableDivider>
      <div className="flex flex-col justify-center gap-4">
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
        <Indicator value={pooling} header="Connection pooling" />
        <Indicator value={sharing} header="Workspace sharing" />
        <Indicator value={noColdStart} header="No cold start" />
        <DoubleHeight
          text={provisionedcompute}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">
                Provisioned Compute
              </div>
              <div className="w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] leading-[22px] text-transparent subpixel-antialiased">
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
              <div className="w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] leading-[22px] text-transparent subpixel-antialiased">
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
              <div className="w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] leading-[22px] text-transparent subpixel-antialiased">
                Coming soon
              </div>
            </div>
          }
        />
        <DoubleHeight
          text={tenantBack}
          header={
            <div className="flex flex-col items-start">
              <div className="leading-[24px] opacity-70">
                Tenant level backups
              </div>
              <div className="w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] leading-[22px] text-transparent subpixel-antialiased">
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
              <div className="w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] leading-[22px] text-transparent subpixel-antialiased">
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
              <div className="w-fit rounded-md border border-zinc-700 bg-gradient-white bg-clip-text px-1.5 text-[12px] leading-[22px] text-transparent subpixel-antialiased">
                Coming soon
              </div>
            </div>
          }
        />

        <TableDivider mobile="usermanagement">
          <div className="my-6 mb-8 hidden h-px bg-divider-bold lg:flex" />
        </TableDivider>
        <Line text="Unlimited" header="Number of active users" />
        <Line text="Unlimited" header="Number of active tenants" />
        <Line text="Unlimited" header="MAUs per tenant" />
        <Indicator value={true} header="Social auth" />
        <Indicator value={true} header="Magic auth" />
        <Indicator value={true} header="Email verification" />
        <DoubleHeightIndicator
          value={enterpriseSaml}
          header="Enterprise SAML"
        />
        <DoubleHeightIndicator value={mfa} header="MFA" />
        <Indicator
          value={tenantOverrides}
          header="Tenant overrides"
          hideDivider
        />
        <TableDivider mobile="console">
          <div className="my-6 mb-8 hidden h-px bg-divider-bold lg:flex" />
        </TableDivider>
        <Indicator value={true} header="Tenant overrides" />
        <Line text={tenantInsights} header="Tenant insights" />
        <Indicator
          value={tenantAdministration}
          header="Tenant administration"
        />
        <Indicator value={tenantApis} hideDivider header="APIs" />
        <TableDivider mobile="support">
          <div className="my-8 mb-8 hidden h-px bg-divider-bold lg:flex" />
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
