import Video from "../Video";
import { Block } from "../block";

export default function Virtualization() {
  return (
    <div className="container mx-auto mt-48">
      <div className="flex justify-center flex-col gap-8">
        <div>
          <div className="text-[64px] leading-[64px] text-center">
            Secure isolation for customer&apos;s
          </div>
          <div className="text-[64px] leading-[64px] text-center">
            data and embeddings
          </div>
        </div>
        <Video src="table.mp4" poster={"table.webp"} />
        <div className="flex flex-row gap-6">
          <div className="bg-orange rounded-lg">
            <Block
              title="Tenant Virtualization"
              subTitle="Built-in tenant virtualization isolates data access across tenants. Restrict access to a specific virtual tenant database from application."
              href="/pricing"
            />
          </div>
          <div className="bg-purple rounded-lg">
            <Block
              title="Hassle Free"
              subTitle="No more struggle with Postgres row level security or with complex application-level authorization logic."
              href="/pricing"
            />
          </div>
          <div className="bg-blue rounded-lg">
            <Block
              title="Share data"
              subTitle="Securely share data across tenants using shared tables"
              href="/pricing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
