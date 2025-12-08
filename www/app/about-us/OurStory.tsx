import Heading from '../_components/common/Heading';
import Image from 'next/image';
import Team from '@/public/team.png';

export default function OurStory() {
  return (
    <div className="flex w-full flex-col">
      <div className="bgDivider -z-20 mt-20 flex flex-1 flex-col pt-20 text-center align-middle">
        <Heading text="Our story" />
      </div>
      <div className="flex flex-col bg-[#000] md:flex-row">
        <div className="flex lg:w-1/2">
          <div className="flex w-full items-center justify-center p-10">
            <div className="rounded-lg border border-gray p-1">
              <Image
                className="rounded-md"
                src={Team}
                alt="the team"
                width={540}
                height={440}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="p-10 text-[18px] opacity-60">
            <p className="mb-2">
              Over the course of six years at Confluent, we transformed the
              company from being primarily on-premise to a globally successful
              SaaS company. Through this journey, we learned the challenges of
              building a SaaS product and what it takes to launch and scale to
              thousands of customers and tens of thousands of users.
            </p>
            <p className="mb-2">
              Most of our problems in building SaaS were around data, and yet
              the database had little to offer. We spent significant time
              managing tenants, building organization and user management,
              supporting different tenant deployment models, storing and moving
              data to different parts of the organization, tracking usage and
              billing individual customers, and handling many other SaaS
              problems.
            </p>
            <p className="mb-2">
              We became fixated on the idea of making the process of building
              and scaling SaaS products easier. This obsession drove us to
              create Nile, with the goal of building something truly wonderful
              that could help thousands of developers create world-class SaaS
              products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
