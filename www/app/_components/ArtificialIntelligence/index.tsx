import Heading from '@/app/_components/common/Heading';
import Image from 'next/image';
import CodeSample from './code.mdx';

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

      <div className="flex flex-col w-full gap-6 mt-7">
        <div className="flex flex-col lg:flex-row">
          <div className="w-1/2 pr-2">
            <div className="border border-gray rounded-[24px] w-full text-center bg-footer bg-center overflow-hidden h-full relative">
              <div className="p-10 flex flex-col gap-4 lg:-mt-[13%] xl:-mt-[8%]">
                <div className="flex flex-row items-end gap-2 max-w-[90%]">
                  <div className="border border-[#393939] rounded-[36px] p-1 shrink-0">
                    <Image
                      src="/icons/person-circle.svg"
                      alt="location pin"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="text-left border border-[#393939] rounded-[20px] px-[20px] py-[12px] opacity-60 bg-[#000]">
                    Hello, I've been trying to integrate your software with our
                    company's CRM, but I'm encountering an error message every
                    time I attempt to connect them.
                  </div>
                </div>
                <div className="flex flex-row items-end gap-2 max-w-[90%] ml-auto">
                  <div className="text-left border border-[#131313] rounded-[20px] px-[20px] py-[12px] bg-[#1F2123]">
                    Hello, I've been trying to integrate your software with our
                    company's CRM, but I'm encountering an error message every
                    time I attempt to connect them.
                  </div>
                  <div className="border border-[#fff] rounded-[36px] p-1 shrink-0 bg-icon">
                    <Image
                      src="/icons/robot-circle.svg"
                      alt="location pin"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-[#101010] rounded-b-[32px] flex flex-col gap-2 absolute bottom-0 left-0 right-0">
                <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-[12px] z-10 relative">
                  Integrated with
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="w-1/3 flex justify-center">
                    <Image
                      src="/openai-logo.svg"
                      alt="location pin"
                      width={100}
                      height={28}
                    />
                  </div>
                  <div className="w-1/3 flex justify-center">
                    <Image
                      src="/hugging-face-logo.svg"
                      alt="location pin"
                      width={137}
                      height={36}
                    />
                  </div>
                  <div className="w-1/3 flex justify-center">
                    <Image
                      src="/replicate-logo.svg"
                      alt="location pin"
                      width={104}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-2">
            <div className="border border-gray rounded-[24px] px-8 py-3 w-full bg-[#000] h-full relative overflow-hidden">
              <div className="absolute bottom-0 bg-fader left-0 right-0 top-[70%]"></div>
              <div className="pb-8">
                <CodeSample />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-1/2 flex flex-col justify-start gap-4 pl-2">
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
          <div className="w-1/2 flex flex-col justify-start gap-4 pl-2">
            <div className="flex flex-row gap-3">
              <Image
                src="/icons/brain.svg"
                alt="brain"
                width={24}
                height={24}
              />
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
    </div>
  );
}
