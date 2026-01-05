'use client';

import { TweetCard, type Tweet } from './TweetCard';
import { NewHeading } from '../common/NewHeading';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const tweets: Tweet[] = [
  {
    id: '1717203591944089762',
    author: {
      name: 'Guillermo Rauch',
      handle: '@rauchg',
      avatar: '/profiles/rauch.jpg',
      title: 'CEO, Vercel',
    },
    content: 'Tenant-aware serverless Postgres. So clever!',
  },
  {
    id: '1717518173824569471',
    author: {
      name: 'Oz Katz',
      handle: '@ozkatz100',
      avatar: '/profiles/ozkatz.jpg',
      title: 'CTO, lakeFS',
    },
    content:
      'This looks INCREDIBLE!\nI\'ve had the "pleasure" of designing multi-tenant SaaS applications several times in my career. Nile seems to tackle exactly all the right problems.',
  },
  {
    id: '1717235597063213325',
    author: {
      name: 'Simon Eskildsen',
      handle: '@sirupsen',
      avatar: '/profiles/sirupsen.jpg',
      title: 'CEO, Turbopuffer',
    },
    content:
      "fascinating as a primitive. Always wanted this.\n\nMulti Tenancy Engineering is a real thing that's often a massive % of what SaaS companies' infra teams do, without naming it.",
  },
  {
    id: '1717205300259017054',
    author: {
      name: 'Siva Narayanan',
      handle: '@sivanarayanan',
      avatar: '/profiles/siva.jpg',
      title: 'CTO, Fyle',
    },
    content:
      'I wish we had all of these things when we started @FyleHQ. This should help startups immensely.',
  },
  {
    id: '1836501428631691683',
    author: {
      name: 'Tanel Poder',
      handle: '@TanelPoder',
      avatar: '/profiles/tanel.jpg',
      title: 'Co-founder, Gluent',
    },
    content:
      'I like how the @niledatabase positions itself. Not a yet another scalable Postgres database, but a SaaS platform with a lot of built-in integrations (yes also AI) for rapid app development *and* shipping!',
  },
  {
    id: '1836457299629498374',
    author: {
      name: 'Jay Kreps',
      handle: '@jaykreps',
      avatar: '/profiles/kreps.png',
      title: 'CEO, Confluent',
    },
    content:
      'Postgres, as a service, done right. Awesome team and an awesome product. Excited to see it launch…',
  },
  {
    id: '1721951479031054364',
    author: {
      name: 'Milos Gajdos',
      handle: '@milosgajdos',
      avatar: '/profiles/milos.jpg',
      title: 'Tech Lead, Docker Hub',
    },
    content:
      'There are a lot of Postgres startups out there but Nile is one of the more interesting things happening in the PG space. To anyone who has worked on some SaaS product, this must look like a no-brainer: multitenant PG.',
  },
];

export default function TweetCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
      skipSnaps: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        speed: 0.8,
      }),
    ],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-2 py-6 sm:px-6 sm:py-16">
      <div className="mb-6 flex justify-center sm:mb-12">
        <NewHeading>What People Are Saying</NewHeading>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="mr-3 min-w-[300px] max-w-[300px] flex-[0_0_auto] sm:mr-6 sm:min-w-[400px] sm:max-w-[400px]"
            >
              <TweetCard tweet={tweet} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
