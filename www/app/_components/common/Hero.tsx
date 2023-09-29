import Link from "next/link";
import GetStartedButton from "./GetStartedButton";
import GradientButton from "./GradientButton";
import PageHeader, { OverrideClasses } from "./PageHeader";

export function HeroText(props: OverrideClasses & { title?: string }) {
  return (
    <div className="px-4 lg:px-0">
      <PageHeader
        title="Serverless Postgres for modern SaaS"
        subtitle="Launch In Days. Grow For Years."
        {...props}
      />
      <div className="flex flex-row gap-4 items-center justify-center pt-5">
        <GetStartedButton />
      </div>
    </div>
  );
}

export function HeroBottom(props: OverrideClasses) {
  return (
    <div className={"lg:w-[784px] flex flex-col place-content-center"}>
      <div className="px-4 lg:px-0 mt-32">
        <div className="text-[56px] bg-gradient-text bg-clip-text text-transparent mb-3 text-center leading-[64px]">
          Postgres purpose built for modern SaaS
        </div>
        <div className="flex flex-row gap-4 items-center justify-center pt-5">
          <GetStartedButton />
          <div>
            <GradientButton variant="soft" href="/contact-us">
              <span className="bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
                Contact Us
              </span>
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
