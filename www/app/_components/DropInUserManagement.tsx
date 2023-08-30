import Heading from "@/app/_components/common/Heading";
import Video from "./Video";
import Image from "next/image";
export default function DropInUserManagement() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col text-center align-middle flex-1">
        <Heading text="Drop in tenant and user management">
          <div className="opacity-60 text-xl">
            Build In Days. Scale For Years.
          </div>
        </Heading>
      </div>
      <Video poster="user-mgmt.jpg" src="user-mgmt.mp4" />

      <div className="flex flex-row gap-8 w-full justify-center">
        <div className="py-4 px-5 w-[280px] itemDivider">
          <div className="flex flex-row relative align-middle justify-center mb-3">
            <Image
              src="/frame-2.svg"
              alt="lightning bolt"
              width={236}
              height={72}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base z-10 relative">
            Authentication across tables, events and metrics
          </div>
        </div>
        <div className="py-4 px-5 w-[280px] itemDivider">
          <div className="flex flex-row relative align-middle justify-center mb-3">
            <Image
              src="/frame-3.svg"
              alt="lightning bolt"
              width={236}
              height={72}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base z-10 relative">
            User and auth tables built in and synced automatically for
            application development
          </div>
        </div>
        <div className="py-4 px-5 w-[280px] itemDivider">
          <div className="flex flex-row relative align-middle justify-center mb-3">
            <Image
              src="/frame-4.svg"
              alt="lightning bolt"
              width={236}
              height={72}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base z-10 relative">
            Built in basic auth, social logins and enterprise support
          </div>
        </div>
        <div className="py-4 px-5 w-[280px] itemDivider">
          <div className="flex flex-row relative align-middle justify-center mb-3">
            <Image
              src="/frame-1.svg"
              alt="lightning bolt"
              width={236}
              height={72}
            />
          </div>
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-base z-10 relative">
            Support for Google, Github, OKTA and more
          </div>
        </div>
      </div>
    </div>
  );
}
