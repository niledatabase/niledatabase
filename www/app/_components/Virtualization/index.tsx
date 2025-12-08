import Video from '../Video';
import { Block } from '../block';
import { NewHeading } from '../common/NewHeading';

export default function Virtualization() {
  return (
    <div className="container mx-auto mt-48">
      <div className="flex flex-col items-center justify-center gap-16">
        <NewHeading>
          Secure isolation for customer&apos;s data and embeddings
        </NewHeading>
        <div className="lg:px-28 lg:py-12">
          <Video src="table.mp4" poster={'table.webp'} />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="rounded-[20px] bg-orange">
            <Block
              title="Tenant virtualization"
              subTitle="Built-in tenant virtualization isolates data access across tenants. Restrict access to a specific virtual tenant database from application."
              href="/docs/tenant-virtualization"
            />
          </div>
          <div className="rounded-[20px] bg-purple">
            <Block
              title="Hassle free"
              subTitle="No more struggle with Postgres row level security or with complex application-level authorization logic."
              href="/docs/tenant-virtualization"
            />
          </div>
          <div className="rounded-[20px] bg-blue">
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
