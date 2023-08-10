import Image from "next/image";
function RectLines(props: { amount: number }) {
  const { amount } = props;
  const placeholder = new Array(amount).fill(null);
  return (
    <div className="flex-1 flex flex-row gap-2">
      {placeholder.map((_val, idx) => {
        return (
          <div
            className="rounded-[5px] w-[18px] h-[14px] bg-[#2C2E2F]"
            key={idx}
          />
        );
      })}
    </div>
  );
}
function GridItem(props: { location: string }) {
  const { location } = props;
  return (
    <div className="h-[146px] bg-color[#0E0E0E] border border-[#242627] p-3 flex gap-10 flex-col rounded-xl">
      <div className="flex gap-2 flex-col">
        <RectLines amount={6} />
        <RectLines amount={6} />
        <RectLines amount={4} />
      </div>
      <div className="text-[#8B8B8B]">
        Tenant DB <span className="text-[6px] align-middle">●</span> {location}
      </div>
    </div>
  );
}
export default function Virtualization() {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h2 className="leading-normal text-left text-[56px] font-normal text-white">
              Built-in Tenant virtualization
            </h2>
          </div>
          <div className="flex align-middle gap-5">
            <div className="rounded-[20px] icon p-3">
              <Image
                src="/icons/protect.svg"
                alt="shield with check"
                width={32}
                height={32}
                priority
              />
            </div>
            <div>
              <h2 className="text-2xl bg-gradient-text bg-clip-text text-transparent leading-normal">
                Native tenant data isolation
              </h2>
              <div className="opacity-60 text-xl">
                Fully secure with no cross tenant access
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-row gap-1.5 mb-5">
          <Image
            src="/icons/nile.svg"
            alt="Nile database icon"
            width={13}
            height={20}
          />
          <span className="text-[#8B8B8B] text-sm">Nile database</span>
        </div>
        <div className="flex row gap-10 flex-wrap">
          <GridItem location="Saudi Arabia" />
          <GridItem location="Portugal" />
          <GridItem location="Israel" />
          <GridItem location="United Kin..." />
          <GridItem location="Ukraine" />
          <GridItem location="Paraguay" />
          <GridItem location="North Korea" />
          <GridItem location="Canada" />
          <GridItem location="Sweden" />
        </div>
      </div>
    </div>
  );
}
