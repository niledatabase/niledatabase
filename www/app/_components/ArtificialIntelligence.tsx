import Heading from "@/app/_components/common/Heading";
import Image from "next/image";

export default function ArtificialIntelligence() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col text-center align-middle flex-1 mb-[87px]">
        <Heading text=" Full stack generative AI experience" />
      </div>
      <div className="flex place-items-center rounded-[24px] border border-gray">
        <div className="flex w-1/2 flex-col">
          <div className="py-4 px-5 flex flex-row gap-5 place-items-top">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/gpt.svg"
                alt="location pin"
                width={32}
                height={32}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Build intelligent SaaS applications with any machine learning
              models of your choice (OpenAI, Hugging Face and more)
            </div>
          </div>
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/vector.svg"
                alt="location pin"
                width={32}
                height={32}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Store vector embeddings per tenant or share embeddings across
              tenants
            </div>
          </div>
          <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
            <div className="z-10 relative icon rounded-[20px] flex justify-center">
              <Image
                src="/icons/speedometer.svg"
                alt="location pin"
                width={40}
                height={40}
              />
            </div>
            <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-xl z-10 relative">
              Deploy embeddings closer to your customers for latency or
              compliance
            </div>
          </div>
        </div>
        <div className="flex w-1/2">
          <Image
            src="/ai.png"
            alt="location pin"
            width={464}
            height={464}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-row w-full gap-6 mt-7">
        <div className="w-1/2 flex flex-col justify-start gap-4">
          <div className="border border-gray rounded-[24px] p-10 w-full text-center">
            a placeholder
          </div>
          <div className="flex flex-row gap-3">
            <Image
              src="/icons/chat-bubble.svg"
              alt="location pin"
              width={24}
              height={24}
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-lg">
              Conversational UI modules integrated end to end
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <Image
              src="/icons/gpt-text.svg"
              alt="location pin"
              width={24}
              height={24}
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-lg">
              Embeddings and metadata in one system
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <Image
              src="/icons/expand.svg"
              alt="expand icon"
              width={24}
              height={24}
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-lg">
              Effortlessly scale your embeddings
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-start gap-4">
          <div className="border border-gray rounded-[24px] p-10 w-full text-center">
            another placeholder
          </div>
          <div className="flex flex-row gap-3">
            <Image src="/icons/brain.svg" alt="brain" width={24} height={24} />
            <div className="bg-gradient-white bg-clip-text text-transparent text-lg">
              Delight your customers with world class AI + SaaS experience
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <Image
              src="/icons/cog.svg"
              alt="settings cog"
              width={24}
              height={24}
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-lg">
              Get more value from your product by increasing productivity
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <Image
              src="/icons/person.svg"
              alt="person icon"
              width={24}
              height={24}
            />
            <div className="bg-gradient-white bg-clip-text text-transparent text-lg">
              Personalized experience  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
