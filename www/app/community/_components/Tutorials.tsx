import Link from "next/link";
import Image from "next/image";
import GradientButton from "@/app/_components/common/GradientButton";
import Heading from "@/app/_components/common/Heading";
import TutorialsIcon from "@/public/icons/tutorials.svg";

const playerProps = {
  allowFullScreen: true,
  title: "YouTube video player",
  allow:
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
};
const videos = [
  {
    title: "Getting Started - SQL",
    videoUrl: "https://www.youtube.com/embed/RKMXk-9B_2A?si=QV1PNSd09YzsfDJo",
  },
  {
    title: "Building a NodeJS Web Application with Nile",
    videoUrl: "https://www.youtube.com/embed/6Lm3-YeLzks?si=A5VNbZ5lgD40PRwm",
  },
  {
    title: "Build a Java application with Nile",
    videoUrl: "https://www.youtube.com/embed/xnji861fsf4?si=asdLXH-M3ACspuzf",
  },
];

export default function Tutorials() {
  return (
    <>
      <Heading text="Learn from our Tutorials" />
      <div className="text-xl opacity-60 text-center mb-10">
        Get started with one of our Nile tutorials
      </div>
      <TutorialList />
      <div className="flex justify-center mt-10">
        <Link href="https://www.youtube.com/@niledev">
          <GradientButton variant="soft">
            <Image
              src={TutorialsIcon}
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

export const TutorialList = () => (
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
            <div className="text-[#F7F8F8] text-[17px] mt-3">{video.title}</div>
          </div>
        </div>
      );
    })}
  </div>
);
