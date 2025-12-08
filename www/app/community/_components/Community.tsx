import Link from 'next/link';
import Image from 'next/image';
import GradientButton from '@/app/_components/common/GradientButton';
import Heading from '@/app/_components/common/Heading';
import SaasCommunityLogo from '@/public/saas-community-logo.png';
import Community from '@/public/icons/community.svg';

const playerProps = {
  allowFullScreen: true,
  title: 'YouTube video player',
  allow:
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
};
const videos = [
  {
    title: 'Cloudflare',
    videoUrl: 'https://www.youtube.com/embed/DvblO-f2bqQ',
  },
  {
    title: 'Airtable',
    videoUrl: 'https://www.youtube.com/embed/KgzwybMkqVc',
  },
  {
    title: 'Loom',
    videoUrl: 'https://www.youtube.com/embed/3SIF03MHaxw',
  },
  {
    title: 'Promise of Serverless',
    videoUrl: 'https://www.youtube.com/embed/vLlSoHqTTN8',
  },
  {
    title: 'Multi-tenant Journey',
    videoUrl: 'https://www.youtube.com/embed/hR5kEfpZM4Y',
  },
  {
    title: 'RLS',
    videoUrl: 'https://www.youtube.com/embed/xwHZxZKecXw',
  },
];
export default function Tutorials() {
  return (
    <>
      <Heading>
        <div className="flex flex-col justify-center gap-4 lg:flex-row">
          <div className="flex justify-center">
            <Image
              src={SaasCommunityLogo}
              alt="purple cloud"
              width={93}
              height={61}
            />
          </div>
          <h2 className="text-center text-[32px] font-normal leading-[40px] text-white lg:text-[56px] lg:leading-[64px]">
            SaaS Developer Community
          </h2>
        </div>
      </Heading>
      <div className="flex justify-center">
        <div className="flex w-2/3 justify-center text-center text-xl opacity-80">
          Watch the SaaS podcast to learn numerous SaaS problems and solutions
          tackled by hundreds of SaaS companies from the cummunity
        </div>
      </div>
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
                <div className="mt-3 text-[17px] text-[#F7F8F8]">
                  {video.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="https://launchpass.com/all-about-saas" target="_blank">
          <GradientButton variant="soft">
            <Image
              src={Community}
              alt="orange halo person"
              width={24}
              height={24}
            />
            <span className="bg-gradient-white bg-clip-text pl-2 text-[16px] text-transparent subpixel-antialiased">
              Join community
            </span>
          </GradientButton>
        </Link>
      </div>
    </>
  );
}
