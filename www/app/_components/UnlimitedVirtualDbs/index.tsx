import Image from "next/image";
import cube from "@/public/cube.svg";
import cubePurple from "@/public/cube_purple.svg";
import cubeBackdrop from "@/public/cube_backdrop.svg";
import cubeBottomLeft from "@/public/cube_bottom_left.svg";
import cubeBottomRight from "@/public/cube_bottom_right.svg";
function Cuber() {
  return (
    <>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-[203px] h-[219px] base">
        <Image src={cube} alt="3d cube" />
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 w-[203px] h-[219px] hover">
        <Image src={cubePurple} alt="3d cube" />
      </div>
    </>
  );
}
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
        <div className="flex justify-center w-full boxes relative pt-16">
          <div className="relative">
            <div className="absolute bg-overlay w-full h-full -z-10 blur-[240px] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full opacity-0 boxes-bg transition-opacity duration-500">
              <Image
                src={cubeBottomRight}
                alt="3d cube"
                className="top-[223px] left-[0px] absolute"
              />
              <Image
                src={cubeBottomLeft}
                alt="3d cube"
                className="absolute top-[292px] left-[486px] "
              />
              <div className="absolute h-56 -left-2 -bottom-[180px] -right-2 bg-fade"></div>
            </div>

            <Image
              src={cubeBackdrop}
              alt="perspective gradient lined platform"
            />
            <div className="cube cube-1 relative">
              <Cuber />
            </div>
            <div className="cube cube-2 relative">
              <Cuber />
            </div>
            <div className="cube cube-3 relative">
              <Cuber />
            </div>
            <div className="cube cube-4 relative">
              <Cuber />
            </div>
            <div className="cube cube-5 relative">
              <Cuber />
            </div>
            <div className="cube cube-6 relative">
              <Cuber />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-6 relative z-10">
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
