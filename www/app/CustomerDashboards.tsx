import Image from "next/image";
export default function CustomerDashboards() {
  return (
    <div className="flex-1">
      <h2 className="leading-normal text-center text-[56px] font-normal text-white mb-[75px]">
        Instant Customer Dashboards
      </h2>
      <Image
        src="/customer-dashboards.svg"
        alt="UI dashboards"
        width={1206}
        height={732}
      />
      <div className="flex flex-row gap-4 justify-center mt-[89px]">
        <div className="py-4 px-5 w-[270px] flex flex-row gap-5">
          <div className="icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/globe.svg"
              alt="wireframe globe"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-base">
            Built in basic auth, social logins and enterprise support
          </div>
        </div>
        <div className="py-4 px-5 w-[270px] flex flex-row gap-5 align-middle">
          <div className="icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/pin.svg"
              alt="wireframe globe"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-base">
            Support for Google, Github, OKTA and more
          </div>
        </div>
        <div className="py-4 px-5 w-[270px] flex flex-row gap-5">
          <div className="icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/rocket.svg"
              alt="wireframe globe"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-base">
            Authentication across tables, events and metrics
          </div>
        </div>
        <div className="py-4 px-5 w-[270px] flex flex-row gap-5">
          <div className="icon rounded-[20px] flex justify-center">
            <Image
              src="/icons/rocket.svg"
              alt="wireframe globe"
              width={41}
              height={40}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-base">
            User and auth tables built in and synced automatically
          </div>
        </div>
      </div>
    </div>
  );
}
