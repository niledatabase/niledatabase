import GetStartedButton from "./GetStartedButton";
import PageHeader from "./PageHeader";

export function HeroText() {
  return (
    <>
      <PageHeader
        title="Serverless Postgres for modern SaaS"
        subtitle="Build In Days. Scale For Years."
      />
      <GetStartedButton />
    </>
  );
}

export function HeroBottom() {
  return (
    <div className={"w-[784px] flex flex-col place-content-center"}>
      <HeroText />
    </div>
  );
}
