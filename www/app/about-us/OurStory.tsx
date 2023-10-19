import Heading from "../_components/common/Heading";
import Image from 'next/image'

export default function OurStory() {
  return (
    <>
      <Heading text="Our story" />
      <div className="flex flex-col md:flex-row">
        <div className="lg:w-1/2 flex">
          <div className="p-10 flex justify-center align-middle w-full h-full">
            <div className="h-full w-full border border-gray rounded-lg p-1">
              <Image
                src="/team.png"
                alt="the team"
                width={400}
                height={250}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="p-10">

            <p className="mb-2 opacity-60">
              Over the course of six years at Confluent, we transformed the
              company from being primarily on-premise to a globally successful
              SaaS company. Through this journey, we learned the challenges of
              building a SaaS product and what it takes to launch and scale to
              thousands of customers and tens of thousands of users.
            </p>
            <p className="mb-2 opacity-60">
              Most of our problems in building SaaS were around data, and yet
              the database had little to offer. We spent significant time
              managing tenants, building organization and user management,
              supporting different tenant deployment models, storing and moving
              data to different parts of the organization, tracking usage and
              billing individual customers, and handling many other SaaS
              problems.
            </p>
            <p className="mb-2 opacity-60">
              We became fixated on the idea of making the process of building
              and scaling SaaS products easier. This obsession drove us to
              create Nile, with the goal of building something truly wonderful
              that could help thousands of developers create world-class SaaS
              products.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
