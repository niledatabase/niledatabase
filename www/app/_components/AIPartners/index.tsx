import Image from 'next/image';
import bedrock from '@/public/icons/aws-bedrock.svg';
import llamaindex from '@/public/icons/llamaindex.svg';
const partners = [
  {
    title: 'aws bedrock',
    icon: bedrock,
    description: 'Your AI-Driven Guide to Seamless Task Management',
    w: 80,
    h: 80,
  },
  {
    title: 'llamaindex',
    icon: llamaindex,
    description: 'Built with AI to power work',
    w: 84,
    h: 84,
  },
  {
    title: 'AITravelMate',
    icon: bedrock,
    description: 'Your business trips managed by AI',
  },
  {
    title: 'SmartSpend AsI',
    icon: bedrock,
    description: 'Set teams free from manual expenses',
  },
  {
    title: 'SmartSpend fAI',
    icon: bedrock,
    description: 'Set teams free from manual expenses',
  },
  {
    title: 'SmartSpend AgI',
    icon: bedrock,
    description: 'Set teams free from manual expenses',
  },
  {
    title: 'SmartSpend AdI',
    icon: bedrock,
    description: 'Set teams free from manual expenses',
  },
  {
    title: 'SmartSpend AtI',
    icon: bedrock,
    description: 'Set teams free from manual expenses',
  },
];
export default function AIPartners() {
  return (
    <div className="container mx-auto bg-[#000]">
      <div className="flex flex-col gap-12 pt-48">
        <div>
          <div className="text-center text-[24px] leading-[24px] xl:text-[32px] xl:leading-[32px]">
            Integrates with our
          </div>
          <div className="text-center text-[24px] leading-[24px] xl:text-[32px] xl:leading-[32px]">
            numerous AI partners
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-4 gap-10">
            {partners.map((partner) => {
              return (
                <div
                  key={partner.title}
                  className="flex h-[147px] w-[147px] items-center justify-center rounded-[20px] bg-darkGray text-[72px] leading-[72px] lg:text-[96px] lg:leading-[96px]"
                >
                  <Image
                    src={partner.icon}
                    alt={partner.title}
                    width={partner.w}
                    height={partner.h}
                    className="rounded-[20px]"
                  ></Image>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
