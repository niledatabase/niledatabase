import Video from "../Video";
import { Block } from "../block";
import { NewHeading } from "../common/NewHeading";

export default function Virtualization() {
  return (
    <div className="container mx-auto mt-48">
      <div className="flex justify-center flex-col gap-16 items-center">
        <NewHeading>
          Secure isolation for customer&apos;s data and embeddings
        </NewHeading>
        <div className="lg:py-12 lg:px-28">
          <Video src="table.mp4" poster={"table.webp"} />
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-orange rounded-[20px]">
            <Block
              title="Tenant virtualization"
              subTitle="Built-in tenant virtualization isolates data access across tenants. Restrict access to a specific virtual tenant database from application."
              href="/docs/tenant-virtualization"
            />
          </div>
          <div className="bg-purple rounded-[20px]">
            <Block
              title="Hassle free"
              subTitle="No more struggle with Postgres row level security or with complex application-level authorization logic."
              href="/docs/tenant-virtualization"
            />
          </div>
          <div className="bg-blue rounded-[20px]">
            <Block
              title="Share data"
              subTitle="Securely share data across tenants using shared tables"
              href="/docs/tenant-virtualization"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
