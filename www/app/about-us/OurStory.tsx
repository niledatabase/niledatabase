import Heading from "../_components/common/Heading";

export default function OurStory() {
  return (
    <>
      <Heading text="Our story" />
      <div className="flex flex-col md:flex-row">
        <div className="w-1/2 flex">
          <div className="p-10 flex justify-center align-middle w-full h-full">
            <div className="h-full w-full border border-gray rounded-lg p-1">
              <div className="bg-gray rounded-lg w-full h-full"></div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="p-10">
            <p className="mb-2 opacity-60">
              In the heart of Silicon Valley, a group of visionary engineers and
              tech enthusiasts came together with a singular mission: to
              revolutionize the way SaaS products are built and scaled. They
              recognized the limitations of existing database solutions and felt
              a strong urge to challenge the status quo. Thus, NileDatabase was
              born.
            </p>
            <p className="mb-2 opacity-60">
              NileDatabase wasn't just another database solution; it was a
              promise. A promise to build from first principles, ensuring that
              every line of code and every algorithm was optimized for the
              modern SaaS landscape. The team believed that by reimagining the
              database infrastructure, they could accelerate the development and
              advancement of the next billion SaaS products.
            </p>
            <p className="mb-2 opacity-60">
              As days turned into nights and nights into days, the NileDatabase
              team worked tirelessly, refining their product and ensuring it met
              the highest standards of performance, scalability, and security.
              They knew that their solution had the potential to be a
              game-changer, not just for established tech giants but for budding
              startups and entrepreneurs eager to make their mark in the SaaS
              world.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
