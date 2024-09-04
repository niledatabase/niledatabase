import Image from "next/image";
type Props = {
  title: string[];
  image: string;
  bullets: string[];
  alt: string;
};
function Box(props: Props) {
  const { title, image, bullets, alt } = props;
  return (
    <div className="flex flex-col gap-10 bg-darkGray rounded-lg pl-10 pt-10 pb-10">
      <div>
        {title.map((item) => {
          return (
            <div key={item} className="text-[42px] leading-[42px]">
              {item}
            </div>
          );
        })}
      </div>
      <div>
        <Image src={image} alt={alt} />
      </div>
      <div className="flex flex-col gap-6">
        {bullets.map((bullet) => {
          return (
            <div key={bullet} className="flex flex-row gap-4">
              <div>check</div>
              <div className="font-medium">{bullet}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default function BottomFour() {
  return (
    <div className="container mx-auto mt-44 flex gap-16 flex-col">
      <div>
        <div className="text-[64px] leading-[64px] text-center">
          Tenant-level branching, backups,
        </div>
        <div className="text-[64px] leading-[64px] text-center">
          schema migration, and insights
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="w-1/2">
          <div className="pr-3 mb-6">
            <Box
              title={["Fine grained", "branching"]}
              image=""
              alt=""
              bullets={[
                "DB level and tenant-level branching",
                "Branch production data for testing",
                "Reproduce customer issues by branching specific tenant data",
              ]}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="pl-3">
            <Box
              title={["Instance customer", "dashboard"]}
              image=""
              alt=""
              bullets={[
                "Track growth of customers, embeddings and queries",
                "Dive into per customer metrics",
                "Manage user profiles for each customer",
              ]}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="pr-3 mb-6">
            <Box
              title={["Automated schema", "migration across tenants"]}
              image=""
              alt=""
              bullets={[
                "Execute DDL once across tenants",
                "Schema migrations are fully atomic",
                "Integrates with existing Postgres tooling",
              ]}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="pl-3">
            <Box
              title={["Tenant-level backups for", "instant restores"]}
              image=""
              alt=""
              bullets={[
                "Execute DDL once across tenants",
                "Schema migrations are fully atomic",
                "Integrates with existing Postgres tooling",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
