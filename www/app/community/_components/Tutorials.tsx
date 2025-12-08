import Link from 'next/link';
import Image from 'next/image';
import GradientButton from '@/app/_components/common/GradientButton';
import Heading from '@/app/_components/common/Heading';
import TutorialsIcon from '@/public/icons/tutorials.svg';

const playerProps = {
  allowFullScreen: true,
  title: 'YouTube video player',
  allow:
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
};
const videos = [
  {
    title: 'Getting Started - SQL',
    videoUrl: 'https://www.youtube.com/embed/RKMXk-9B_2A?si=QV1PNSd09YzsfDJo',
  },
  {
    title: 'Building a NodeJS Web Application with Nile',
    videoUrl: 'https://www.youtube.com/embed/6Lm3-YeLzks?si=A5VNbZ5lgD40PRwm',
  },
  {
    title: 'Built a NextJS application with Nile',
    videoUrl: 'https://www.youtube.com/embed/Eo0dDROnJGg?si=qS4Rg8LAyIkK4zfB',
  },
  {
    title:
      "Build multi-tenant SaaS application with Python and Nile's Postgres",
    videoUrl: 'https://www.youtube.com/embed/Axl63TUf2bc?si=72ad_nUkaiYWP8jz',
  },
  {
    title: 'Build multi-tenant application with Nile and Prisma ORM',
    videoUrl: 'https://www.youtube.com/embed/qsQSQoMpluk?si=iBxer1f202pvfZH6',
  },
  {
    title: 'Build a multi-tenant application with Nile and Drizzle ORM',
    videoUrl: 'https://www.youtube.com/embed/Qx0_99qebjo?si=np370EsZPJmM-1zA',
  },
  {
    title: 'Serverless Backend for SaaS with Nile and AWS Lambda',
    videoUrl: 'https://www.youtube.com/embed/tikEF_zCw8g?si=AAhUcVw0IY6zDvkw',
  },
  {
    title:
      "Authentication for multi-tenant applications with NextAuth and Nile's Postgres",
    videoUrl: 'https://www.youtube.com/embed/EcZAsp4R0ig?si=YV6Z962bbO4Z51Kv',
  },
  {
    title:
      "Add Payments and Subscriptions to your SaaS - with Stripe and Nile's Postgres",
    videoUrl: 'https://www.youtube.com/embed/DBmG6vcjH5M?si=up7822tnQK1k01Ka',
  },
];

export default function Tutorials() {
  return (
    <>
      <Heading text="Learn from our Tutorials" />
      <div className="mb-10 text-center text-xl opacity-60">
        Get started with one of our Nile tutorials
      </div>
      <TutorialList />
      <div className="mt-10 flex justify-center">
        <Link href="https://www.youtube.com/@niledatabase">
          <GradientButton variant="soft">
            <Image
              src={TutorialsIcon}
              alt="orange open book"
              width={24}
              height={24}
            />
            <span className="bg-gradient-white bg-clip-text pl-2 text-[16px] text-transparent subpixel-antialiased">
              Browse more tutorials
            </span>
          </GradientButton>
        </Link>
      </div>
    </>
  );
}

export const TutorialList = () => (
  <div className="mt-16 flex flex-col flex-wrap justify-center lg:flex-row">
    {videos.map((video) => {
      return (
        <div key={video.videoUrl} className="w-full lg:w-1/2 xl:w-1/3">
          <div className="p-4">
            <div className="aspect-video rounded-[20px] border border-gray p-4">
              <iframe
                className="h-full w-full overflow-hidden rounded-xl"
                {...playerProps}
                src={video.videoUrl}
              />
            </div>
            <div className="mt-3 text-[17px] text-[#F7F8F8]">{video.title}</div>
          </div>
        </div>
      );
    })}
  </div>
);
