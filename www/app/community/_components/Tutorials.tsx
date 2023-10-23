import Link from "next/link";
import Image from "next/image";
import GradientButton from "@/app/_components/common/GradientButton";
import Heading from "@/app/_components/common/Heading";

const playerProps = {
  allowFullScreen: true,
  title: "YouTube video player",
  allow:
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
};
const videos = [
  {
    title: "Getting Started - SQL",
    videoUrl: "https://youtu.be/RKMXk-9B_2A",
  },
  {
    title: "Build a Java application with Nile",
    videoUrl: "https://youtu.be/xnji861fsf4",
  },
];

export default function Tutorials() {
  return (
    <>
      <Heading text="Learn from our Tutorials" />
      <div className="text-xl opacity-60 text-center mb-10">
        Get started with one of our Nile tutorials
      </div>
      <div className="flex flex-col lg:flex-row flex-wrap mt-16 justify-center">
        {videos.map((video) => {
          return (
            <div key={video.videoUrl} className="w-full lg:w-1/2 xl:w-1/3">
              <div className="p-4">
                <div className="border border-gray rounded-[20px] p-4 aspect-video">
                  <iframe
                    className="rounded-xl overflow-hidden w-full h-full"
                    {...playerProps}
                    src={video.videoUrl}
                  />
                </div>
                <div className="text-[#F7F8F8] text-[17px] mt-3">
                  {video.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Link href="https://www.youtube.com/@niledev">
          <GradientButton variant="soft">
            <Image
              src="/icons/tutorials.svg"
              alt="orange open book"
              width={24}
              height={24}
            />
            <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
              Browse more tutorials
            </span>
          </GradientButton>
        </Link>
      </div>
    </>
  );
}
