import Heading from "@/app/_components/common/Heading";
import Video from "./Video";
import Image from "next/image";
export default function DropInUserManagement() {
  return (
    <div className="container mx-auto">
      <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
        <div className="flex w-full flex-col">
          <div className="flex flex-col text-center align-middle flex-1 bgDivider pt-20 mt-20 -z-20">
            <Heading text="Drop-in tenant and user management"></Heading>
          </div>
          <div className="hidden md:block">
            <Video poster="user-mgmt.jpg" src="user-mgmt.mp4" />
          </div>
          <div className="block md:hidden my-5">
            <Video poster="user-mgmt-vert.jpg" src="user-mgmt-vert.mp4" />
          </div>

          <div className="flex flex-col md:flex-row w-full justify-center flex-wrap">
            <div className="py-4 px-5 md:w-1/2 lg:w-1/4">
              <div className="py-4 px-5 itemDivider">
                <div className="flex flex-row relative align-middle justify-center mb-3">
                  <Image
                    src="/frame-2.svg"
                    alt="lightning bolt"
                    width={236}
                    height={72}
                  />
                </div>
                <div className="opacity-80 text-[18px] bg-clip-text text-center z-10 relative">
                  Tenant-level user authentication and authorization controls
                </div>
              </div>
            </div>
            <div className="py-4 px-5 md:w-1/2 lg:w-1/4">
              <div className="py-4 px-5 itemDivider">
                <div className="flex flex-row relative align-middle justify-center mb-3">
                  <Image
                    src="/frame-3.svg"
                    alt="lightning bolt"
                    width={236}
                    height={72}
                  />
                </div>
                <div className="opacity-80 text-[18px] bg-clip-text text-center z-10 relative">
                  Manage organizations, user invites, and multiple membership
                  support
                </div>
              </div>
            </div>
            <div className="py-4 px-5 md:w-1/2 lg:w-1/4">
              <div className="py-4 px-5 itemDivider">
                <div className="flex flex-row relative align-middle justify-center mb-3">
                  <Image
                    src="/frame-1.svg"
                    alt="lightning bolt"
                    width={236}
                    height={72}
                  />
                </div>
                <div className="opacity-80 text-[18px] bg-clip-text text-center z-10 relative">
                  Built-in basic auth, social logins, and enterprise login
                  support
                </div>
              </div>
            </div>
            <div className="py-4 px-5 md:w-1/2 lg:w-1/4">
              <div className="py-4 px-5 itemDivider">
                <div className="flex flex-row relative align-middle justify-center mb-3">
                  <Image
                    src="/frame-4.svg"
                    alt="lightning bolt"
                    width={236}
                    height={72}
                  />
                </div>
                <div className="opacity-80 text-[18px] bg-clip-text text-center z-10 relative">
                  Postgres as the source of truth for user data
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
