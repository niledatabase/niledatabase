import Image from 'next/image';
import cube from '@/public/cube.svg';
import cubePurple from '@/public/cube_purple.svg';
import cubeBackdrop from '@/public/cube_backdrop.svg';
import cubeBottomLeft from '@/public/cube_bottom_left.svg';
import cubeBottomRight from '@/public/cube_bottom_right.svg';
import { NewHeading } from '../common/NewHeading';
function Cuber() {
  return (
    <>
      <div className="base absolute bottom-0 left-0 right-0 top-0 h-[219px] w-[203px]">
        <Image src={cube} alt="3d cube" />
      </div>
      <div className="hover absolute bottom-0 left-0 right-0 top-0 h-[219px] w-[203px]">
        <Image src={cubePurple} alt="3d cube" />
      </div>
    </>
  );
}
export default function UnlimitedVirtualDbs() {
  return (
    <div className="container mx-auto mt-20">
      <div className="flex flex-col justify-center gap-16">
        <div className="flex w-full flex-col items-center justify-center">
          <NewHeading>One Postgres database</NewHeading>
          <NewHeading>Unlimited virtual tenant databases</NewHeading>
        </div>
        <div className="boxes pointer-events-none relative -ml-28 flex w-full shrink-0 justify-center sm:-ml-10 lg:pointer-events-auto lg:pt-16">
          <div className="relative scale-[.42] md:scale-50 lg:scale-100">
            <div className="pointer-events-none absolute -z-10 hidden h-full w-full bg-overlay opacity-20 blur-[240px] lg:flex"></div>

            <div className="boxes-bg pointer-events-none absolute left-0 top-0 hidden h-full w-full opacity-0 transition-opacity duration-500 lg:flex">
              <Image
                src={cubeBottomRight}
                alt="3d cube"
                className="absolute left-[0px] top-[223px]"
              />
              <Image
                src={cubeBottomLeft}
                alt="3d cube"
                className="absolute left-[486px] top-[292px]"
              />
              <div className="absolute -bottom-[180px] -left-2 -right-2 h-56 bg-fade"></div>
            </div>

            <div className="pointer-events-none max-w-none opacity-0 lg:max-w-max lg:opacity-100">
              <Image
                src={cubeBackdrop}
                alt="perspective gradient lined platform"
              />
            </div>
            <div className="cube cube-1 absolute left-0 top-0">
              <Cuber />
            </div>
            <div className="cube cube-2 absolute left-0 top-0">
              <Cuber />
            </div>
            <div className="cube cube-3 absolute left-0 top-0">
              <Cuber />
            </div>
            <div className="cube cube-4 absolute left-0 top-0">
              <Cuber />
            </div>
            <div className="cube cube-5 absolute left-0 top-0">
              <Cuber />
            </div>
            <div className="cube cube-6 absolute left-0 top-0">
              <Cuber />
            </div>
          </div>
        </div>

        <div className="-10 relative z-10 flex flex-col items-center justify-center gap-6 md:flex-row md:items-start">
          <div className="max-w-[400px] border-l-4 border-orange pl-5 text-[20px] leading-[24px] xl:text-[24px]">
            Avoid operational nightmares, frustrating developer experiences and
            high costs of managing one database per tenant
          </div>
          <div className="max-w-[400px] border-l-4 border-purple pl-5 text-[20px] leading-[24px] xl:text-[24px]">
            Eliminate noisy neighbor problems and leaky data isolation when
            using one database for all your tenants
          </div>
          <div className="max-w-[400px] border-l-4 border-blue pl-5 text-[20px] leading-[24px] xl:text-[24px]">
            Enjoy the isolation of db per tenant model with the cost efficiency
            and developer experience of one db for all the tenants
          </div>
        </div>
      </div>
    </div>
  );
}
