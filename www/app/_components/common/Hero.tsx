import GetStartedButton from "./GetStartedButton";
import PageHeader, { OverrideClasses } from "./PageHeader";

export function HeroText(props: OverrideClasses) {
  return (
    <>
      <PageHeader
        title="Serverless Postgres for modern SaaS"
        subtitle="Build In Days. Scale For Years."
        {...props}
      />
      <GetStartedButton />
    </>
  );
}

export function HeroBottom(props: OverrideClasses) {
  return (
    <div className={"w-[784px] flex flex-col place-content-center"}>
      <HeroText {...props} />
    </div>
  );
}
