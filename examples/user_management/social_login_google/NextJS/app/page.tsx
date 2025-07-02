import {
  Azure,
  Discord,
  GitHub,
  HubSpot,
  LinkedIn,
  Slack,
  X,
  Google,
} from "@niledatabase/react";

export default function Home() {
  return (
    <div className="mt-56 flex flex-col gap-5">
      <Google callbackUrl="/dashboard" className="text-white" />
      <Azure callbackUrl="/dashboard" />
      <Discord callbackUrl="/dashboard" />
      <GitHub callbackUrl="/dashboard" />
      <HubSpot callbackUrl="/dashboard" />
      <LinkedIn callbackUrl="/dashboard" />
      <Slack callbackUrl="/dashboard" />
      <X callbackUrl="/dashboard" />
    </div>
  );
}
