import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg';
import postgresBlack from '@/public/postgres-black.png';
import AnimatedGradient from '../../AnimatedGradient';
import TextTyper from './TextTyper';

export function HeroText() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="flex flex-col gap-2 text-[42px] leading-[42px] lg:text-[96px] lg:leading-[96px]">
        <div className="flex flex-col items-start gap-2 font-medium lg:flex-row lg:items-center">
          Build{' '}
          <div className="gradient-dashed-border relative overflow-hidden rounded-[20px] px-6 py-3">
            <div className="overflow-hidden whitespace-nowrap bg-black bg-gradient-text bg-clip-text leading-[48px] text-transparent subpixel-antialiased lg:leading-[120px]">
              <TextTyper
                words={[
                  'Marketing',
                  'Sales',
                  'Legal',
                  'Finance',
                  'Healthcare',
                  'Collaborative',
                  'Support',
                  'Recruiting',
                  'Security',
                  'Hospitality',
                  'Developer',
                  'Education',
                ]}
              />
            </div>
          </div>
        </div>
        <div>B2B apps fast</div>
      </h1>
      <h2 className="text-[24px] leading-[24px] xl:text-[32px] xl:leading-[32px]">
        PostgreSQL re-engineered&nbsp;
        <br className="block md:hidden" />
        for multi-tenant apps &nbsp;
      </h2>
      <div className="flex items-center justify-start gap-4">
        <a href="https://console.thenile.dev" className="flex">
          <button className="flex h-11 flex-row items-center gap-2 rounded-[10px] bg-blue px-4 py-2 text-[16px] leading-[20px] text-black transition-colors">
            Build with Nile
            <Image
              className="-ml-1 invert"
              src={arrow}
              alt="arrow"
              width={16}
              height={16}
            />
          </button>
        </a>
      </div>
    </div>
  );
}

export function HeroBottom({
  cta = (
    <>
      <div className="flex items-center">
        <Image
          src={postgresBlack}
          alt="black postgres logo"
          className="w-7 lg:w-auto"
          height={40}
          width={40}
        />
      </div>
      <div className="flex shrink-0 flex-row text-[24px] leading-[28px] text-black lg:text-[48px] lg:leading-[52px]">
        Postgres.
      </div>
    </>
  ),
}: {
  cta?: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="mt-20 w-full">
        <AnimatedGradient>
          <div className="flex flex-col gap-4 px-4 py-6 lg:p-10 lg:pt-48">
            <div className="flex flex-col gap-1">
              <div className="text-[24px] font-semibold leading-[28px] text-black lg:text-[48px] lg:leading-[52px]">
                Ready to launch?
              </div>
              <div className="flex flex-col gap-1 text-[24px] leading-[28px] text-black md:flex-row md:items-center lg:gap-2 lg:text-[48px] lg:leading-[52px]">
                <div className="whitespace-nowrap">Start building with</div>
                {cta}
              </div>
            </div>
            <div className="flex items-center justify-start gap-4">
              <a href="https://console.thenile.dev" className="flex">
                <button className="flex h-11 flex-row items-center gap-2 rounded-[10px] bg-blue px-4 py-2 text-[16px] leading-[20px] text-black transition-colors">
                  Build with Nile
                  <Image
                    className="-ml-1 invert"
                    src={arrow}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </button>
              </a>
            </div>
          </div>
        </AnimatedGradient>
      </div>
    </div>
  );
}
