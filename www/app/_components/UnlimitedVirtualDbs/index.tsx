export default function UnlimitedVirtualDbs() {
  return (
    <div className="container mx-auto mt-20">
      <div className="flex justify-center flex-col gap-16">
        <div className="flex justify-center flex-col ">
          <div className="text-[64px] leading-[64px] text-center">
            One Postgres database
          </div>
          <div className="text-[64px] leading-[64px] text-center">
            Unlimited virtual tenant databases
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="relative">
            <div className="perspective-container relative -z-10">
              <div className="gradient-border"></div>
            </div>
            <div className="cube cube-1">🧊</div>
            <div className="cube cube-2">🧊</div>
            <div className="cube cube-3">🧊</div>
            <div className="cube cube-4">🧊</div>
            <div className="cube cube-5">🧊</div>
            <div className="cube cube-6">🧊</div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div className="border-orange border-l-4 pl-5 w-[400px] text-[24px] leading-[24px]">
            Avoid operational nightmares, frustrating developer experiences and
            high costs of managing one database per tenant
          </div>
          <div className="border-purple border-l-4 pl-5 w-[400px] text-[24px] leading-[24px]">
            Eliminate noisy neighbor problems and leaky data isolation when
            using one database for all your tenants
          </div>
          <div className="border-blue border-l-4 pl-5 w-[400px] text-[24px] leading-[24px]">
            Enjoy the isolation of db per tenant model with the cost efficiency
            and developer experience of one db for all the tenants
          </div>
        </div>
      </div>
    </div>
  );
}
