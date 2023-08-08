import Image from "next/image";
export default function Elastic() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col text-center align-middle flex-1 mb-[87px]">
        <h2 className="leading-normal text-center text-[56px] font-normal text-white">
          Effortlessly Elastic
        </h2>
      </div>
      <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
        <div className="z-10 relative icon rounded-[20px] flex justify-center">
          <Image
            src="/icons/serverless.svg"
            alt="location pin"
            width={40}
            height={40}
          />
        </div>
        <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
          Truly serverless - &quot;Think queries, not machines&quot;
        </div>
      </div>
      <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
        <div className="z-10 relative icon rounded-[20px] flex justify-center">
          <Image
            src="/icons/money.svg"
            alt="location pin"
            width={40}
            height={40}
          />
        </div>
        <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
          Pay for what you use
        </div>
      </div>
      <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
        <div className="z-10 relative icon rounded-[20px] flex justify-center">
          <Image
            src="/icons/bolt.svg"
            alt="location pin"
            width={40}
            height={40}
          />
        </div>
        <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
          Scales to zero with instant availability
        </div>
      </div>
      <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
        <div className="z-10 relative icon rounded-[20px] flex justify-center">
          <Image
            src="/icons/people.svg"
            alt="location pin"
            width={40}
            height={40}
          />
        </div>
        <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
          Scale to millions of tenants
        </div>
      </div>
    </div>
  );
}
