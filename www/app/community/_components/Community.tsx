import Link from "next/link";
import Image from "next/image";
import GradientButton from "@/app/_components/common/GradientButton";
import Heading from "@/app/_components/common/Heading";

const playerProps = {
  width: 372,
  height: 218,
  allowFullScreen: true,
  title: "YouTube video player",
  allow:
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
};
const videos = [
  {
    title: "Cloudflare",
    videoUrl: "https://www.youtube.com/embed/DvblO-f2bqQ",
  },
  {
    title: "Airtable",
    videoUrl: "https://www.youtube.com/embed/KgzwybMkqVc",
  },
  {
    title: "Loom",
    videoUrl: "https://www.youtube.com/embed/3SIF03MHaxw",
  },
  {
    title: "Uber",
    videoUrl: "https://www.youtube.com/embed/pQ4qeF8WS0A",
  },
  {
    title: "Multi-tenant Journey",
    videoUrl: "https://www.youtube.com/embed/hR5kEfpZM4Y",
  },
  {
    title: "RLS",
    videoUrl: "https://www.youtube.com/embed/xwHZxZKecXw",
  },
];
export default function Tutorials() {
  return (
    <>
      <Heading>
        <div className="flex flex-row gap-4 justify-center">
          <Image
            src="/saas-community-logo.png"
            alt="purple cloud"
            width={93}
            height={61}
          />
          <h2 className="leading-[64px] text-center text-[56px] font-normal text-white">
            SaaS Developer Community
          </h2>
        </div>
      </Heading>
      <div className="flex justify-center">
        <div className="text-xl opacity-60 w-2/3 flex justify-center text-center">
          Watch the SaaS podcast to learn numerous SaaS problems and solutions
          tackled by hundreds of SaaS companies from the cummunity
        </div>
      </div>
      <div className="flex flex-row gap-8 flex-wrap mt-16">
        {videos.map((video) => {
          return (
            <div key={video.videoUrl}>
              <div className="border border-gray rounded-[20px] p-4">
                <iframe
                  className="rounded-xl overflow-hidden"
                  {...playerProps}
                  src={video.videoUrl}
                />
              </div>
              <div className="text-[#F7F8F8] text-[17px] mt-3">
                {video.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="https://www.youtube.com/@saas-dev">
          <GradientButton variant="soft">
            <Image
              src="/icons/community.svg"
              alt="orange halo person"
              width={24}
              height={24}
            />
            <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
              Join community
            </span>
          </GradientButton>
        </Link>
      </div>
    </>
  );
}
