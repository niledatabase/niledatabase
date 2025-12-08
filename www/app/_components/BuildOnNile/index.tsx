'use client';
import Image from 'next/image';
import chevron from '@/public/icons/chevron.svg';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NewHeading } from '../common/NewHeading';
import taskpilot from '@/public/icons/builtOnNile/taskpilot.svg';
import travelmate from '@/public/icons/builtOnNile/travelmate.svg';
import HealthPilot from '@/public/icons/builtOnNile/HealthPilot.svg';
import LawPilot from '@/public/icons/builtOnNile/lawpilot.svg';
import saleslead from '@/public/icons/builtOnNile/saleslead.svg';
import recruitai from '@/public/icons/builtOnNile/recruitai.svg';
import supply from '@/public/icons/builtOnNile/supply.svg';
import smartspend from '@/public/icons/builtOnNile/smartspend.svg';
import smartlearn from '@/public/icons/builtOnNile/smartlearn.svg';
import smartnotion from '@/public/icons/builtOnNile/smartnotion.svg';
import customerdesk from '@/public/icons/builtOnNile/customerdesk.svg';
import smartcampaign from '@/public/icons/builtOnNile/smartcampaign.svg';
import CalendiQ from '@/public/icons/builtOnNile/CalendiQ.svg';
import hrintelli from '@/public/icons/builtOnNile/hrintelli.svg';
const items: Item[] = [
  {
    title: 'TaskPilot AI',
    icon: taskpilot,
    description: 'Your AI-Driven Guide to Seamless Task Management',
    href: 'docs/getting-started/usecases/issue-tracking',
  },
  {
    title: 'AITravelMate',
    icon: travelmate,
    description: 'your business trips managed by AI',
    href: 'docs/getting-started/usecases/tripactions',
  },
  {
    title: 'SmartLearn',
    icon: smartlearn,
    description: 'AI Intelligence for the Modern Classroom',
    href: 'docs/getting-started/usecases/schoology',
  },
  {
    title: 'LawPilot AI',
    icon: LawPilot,
    description: 'AI That Thinks Like a Lawyer',
    href: 'docs/getting-started/usecases/legal',
  },
  {
    title: 'HealthPilot',
    icon: HealthPilot,
    description: 'Enhancing Patient Care with Intelligent Assistance',
    href: 'docs/getting-started/usecases/health',
  },
  {
    title: 'RecruitAI',
    icon: recruitai,
    description: 'Smarter Hiring, Powered by AI',
    href: 'docs/getting-started/usecases/hiring',
  },
  {
    title: 'SupplyAI',
    icon: supply,
    description: 'AI-Powered Efficiency for Your Supply Chain',
    href: 'docs/getting-started/usecases/supply',
  },
  {
    title: 'CalendiQ',
    icon: CalendiQ,
    description: 'Intelligent Calendar Management for Busy Lives',
    href: 'docs/getting-started/usecases/scheduler',
  },
  {
    title: 'HRIntelli',
    icon: hrintelli,
    description: 'Magically Simplifying HR with AI',
    href: 'docs/getting-started/usecases/hr',
  },
  {
    title: 'SmartCampaign AI',
    icon: smartcampaign,
    description: 'Your AI-Driven Marketing Ally',
    href: 'docs/getting-started/usecases/marketing',
  },
  {
    title: 'CustomerDesk AI',
    icon: customerdesk,
    description: 'Effortless Assistance, Powered by AI',
    href: 'docs/getting-started/usecases/support',
  },
  {
    title: 'SmartNotion AI',
    icon: smartnotion,
    description: 'Crafting Organized Thoughts with Artificial Intelligence',
    href: 'docs/getting-started/usecases/notion',
  },
  {
    title: 'SmartSpend AI',
    icon: smartspend,
    description: 'Set teams free from manual expenses',
    href: 'docs/getting-started/usecases/expensify',
  },
  {
    title: 'SalesLeadPilot',
    icon: saleslead,
    description: 'AI-Driven Guidance for Superior Lead Management',
    href: 'docs/getting-started/usecases/lead-management',
  },

  // {
  // title: "Slack++",
  // icon: HealthPilot,
  // description: "Built with AI to power work",
  // href: "docs/getting-started/usecases/slack",
  // },

  // {
  // title: "SmartBooks AI",
  // icon: LawPilot,
  // description: "Your Intelligent Accounting Partner",
  // href: "docs/getting-started/usecases/accounts",
  // },
  //
  // {
  // title: "Feedback360 AI",
  // icon: LawPilot,
  // description: "360-Degree Feedback, Perfected with AI",
  // href: "docs/getting-started/usecases/feedback",
  // },
  // {
  // title: "OnboardIQ",
  // icon: LawPilot,
  // description: "Transform Customer Onboarding with Insightful AI",
  // href: "docs/getting-started/usecases/onboarding",
  // },
];
type Item = {
  title: string;
  icon: string;
  description: string;
  href: string;
};
function CarouselItem(props: Item) {
  const { title, icon, description, href } = props;
  return (
    <div className="gradientBorderBox h-[380px] w-[320px] shrink-0 justify-between overflow-hidden rounded-xl bg-[#262626] transition-opacity hover:before:opacity-100 lg:h-[472px] lg:w-[388px]">
      <a href={`https://thenile.dev/${href}`} className="h-full w-full">
        <div className="flex h-1/2 items-center justify-center p-6">
          <div className="flex h-[174px] w-[174px] items-center justify-center rounded-lg">
            <Image src={icon} alt={''}></Image>
          </div>
        </div>
        <div className="h-1/2 bg-darkGray">
          <div className="flex flex-col gap-4 p-6">
            <div className="text-[24px] leading-[24px] lg:text-[32px] lg:leading-8">
              {title}
            </div>
            <div className="text-[20px] leading-6 lg:text-[24px] lg:leading-7">
              {description}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

const DEFAULT_FULL_ITEM_WIDTH = 388 + 24;
const MOBILE_FULL_ITEM_WIDTH = 329 + 12;

function tweenScrollLeft(
  element: HTMLElement,
  targetPosition: number,
  duration: number,
) {
  const startPosition = element.scrollLeft;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime: number) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1

    // Ease-in-out function for smoothness
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    // Update the scroll position
    element.scrollLeft = startPosition + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animation); // Continue the animation until complete
    }
  }

  requestAnimationFrame(animation);
}

export default function BuiltOnNile() {
  const [itemWidth, setItemWidth] = useState(DEFAULT_FULL_ITEM_WIDTH);
  const [extra, setExtra] = useState(48);
  const [toMove, setToMove] = useState(2);
  const [x, setX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const scrollWatcher = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 968) {
      setItemWidth(MOBILE_FULL_ITEM_WIDTH);
      setExtra(0);
      setToMove(1);
    }
  }, []);

  const AMOUNT_TO_MOVE = useMemo(
    () => itemWidth * toMove + extra,
    [itemWidth, toMove, extra],
  );

  const maxPosition = useMemo(
    () => items.length * itemWidth + extra,
    [items.length, itemWidth, extra],
  );

  const forward = useCallback(() => {
    if (scrollWatcher.current) {
      const containerWidth = ref.current?.clientWidth ?? 0;
      const newX = scrollWatcher.current.scrollLeft + AMOUNT_TO_MOVE;
      tweenScrollLeft(scrollWatcher.current, newX, 400);
      setX(Math.min(newX + AMOUNT_TO_MOVE, maxPosition - containerWidth));
    }
  }, [x, AMOUNT_TO_MOVE]);

  const back = useCallback(() => {
    if (scrollWatcher.current) {
      tweenScrollLeft(
        scrollWatcher.current,
        scrollWatcher.current.scrollLeft - AMOUNT_TO_MOVE,
        400,
      );
      setX(Math.max(scrollWatcher.current.scrollLeft - AMOUNT_TO_MOVE, 0));
    }
  }, [x, AMOUNT_TO_MOVE]);

  return (
    <div
      className="mx-auto mt-20 flex w-full flex-col gap-10 pl-4 sm:container"
      ref={ref}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="whitespace-nowrap">
          <NewHeading>Built on Nile</NewHeading>
        </div>
        <div className="hidden flex-row gap-6 lg:flex">
          <button className="flex h-[40px] w-[40px] rotate-180 items-center justify-center rounded-full bg-darkGray">
            <Image
              src={chevron}
              alt="arrow"
              width={24}
              height={24}
              className={x === 0 ? 'opacity-20' : ''}
              onClick={back}
            />
          </button>
          <button
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-darkGray"
            onClick={forward}
          >
            <Image
              className={
                x >= maxPosition - (ref.current?.clientWidth ?? 0)
                  ? 'opacity-20'
                  : ''
              }
              src={chevron}
              alt="arrow"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div className="no-scrollbar overflow-x-scroll" ref={scrollWatcher}>
        <div className="align-start flex flex-row flex-nowrap gap-3 transition-transform ease-in-out lg:gap-6">
          {items.map((item) => {
            return <CarouselItem key={item.title} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
}
