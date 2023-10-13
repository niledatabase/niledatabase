import Image from "next/image";
import PageHeader, { OverrideClasses } from "./PageHeader";
import Subscribe from "@/app/blog/_components/Footer/Subscribe";
import Footer from "@/app/blog/_components/Footer";

export function HeroText(props: OverrideClasses & { title?: string }) {
  return (
    <div className="px-4 lg:px-0">
      <PageHeader
        title="Serverless Postgres for modern SaaS"
        subtitle="Launch In Days. Grow For Years."
        {...props}
      />
      <div className="flex flex-row gap-4 items-center justify-center pt-5">
        <Subscribe />
      </div>
    </div>
  );
}

export function HeroBottom() {
  return (
    <div className={"w-[320px] lg:w-[784px] flex flex-col items-center"}>
      <div className="px-4 lg:px-0 mt-32">
        <Footer />
      </div>
      <Image
        className="mt-16 -mb-36 lg:-mb-44 relative -z-[2001] px-12 lg:px-0"
        src="/nile-outline-logo.svg"
        width="646"
        height="239"
        alt="nile outlined logo"
      />
    </div>
  );
}
