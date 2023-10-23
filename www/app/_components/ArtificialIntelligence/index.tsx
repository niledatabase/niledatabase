import Heading from "@/app/_components/common/Heading";
import Image from "next/image";
import CodeSample from "./code.mdx";

import AI from "@/public/ai.png";
import OpenAI from "@/public/openai-logo.svg";
import HuggingFace from "@/public/hugging-face-logo.svg";
import Replicate from "@/public/replicate-logo.svg";

import Models from "@/public/icons/models.svg";
import Chat from "@/public/icons/chat.svg";
import Scale from "@/public/icons/scale.svg";
import AINative from "@/public/icons/ai-native.svg";
import Customer from "@/public/icons/customer.svg";
import OSS from "@/public/icons/oss.svg";
import PersonCircle from "@/public/icons/person-circle.svg";
import RobotCircle from "@/public/icons/robot-circle.svg";
import Store from "@/public/icons/store.svg";
import Deploy from "@/public/icons/deploy.svg";
import Query from "@/public/icons/query.svg";

function ChatBlurbContent() {
  return (
    <>
      <div className="flex flex-row gap-3">
        <Image src={Models} alt="location pin" width={24} height={24} />
        <div className="opacity-60 text-[18px] bg-clip-text">
          Work with any large language models of your choice from OpenAI,
          Hugging Face and more
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Image src={Chat} alt="location pin" width={24} height={24} />
        <div className="opacity-60 text-[18px] bg-clip-text">
          Build domain specific conversational UIs, chatbots and semantic search
          products
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <Image src={Scale} alt="expand icon" width={24} height={24} />
        <div className="opacity-60 text-[18px] bg-clip-text">
          Effortlessly scale your embeddings as your AI use case grows
        </div>
      </div>
    </>
  );
}
function ChatBlurb() {
  return (
    <div className="lg:w-1/2 flex-col justify-start gap-4 pl-2 lg:flex hidden">
      <ChatBlurbContent />
    </div>
  );
}
function ChatBlurbStacked() {
  return (
    <div className="lg:w-1/2 flex-col justify-start gap-4 pl-2 lg:hidden flex m-4  mx-auto lg:mx-0">
      <ChatBlurbContent />
    </div>
  );
}
export default function ArtificialIntelligence() {
  return (
    <div className="container mx-auto">
      <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
        <div className="flex w-full flex-col">
          <div className="flex flex-col text-center align-middle flex-1 bgDivider pt-20 mt-20 -z-20">
            <Heading text="Seamless tenant-aware AI-native applications" />
          </div>
          <div className="flex flex-col lg:flex-row place-items-center rounded-[24px] border border-gray overflow-hidden bg-[#000] -mt-3">
            <div className="flex lg:w-1/2 flex-col">
              <div className="py-4 px-5 flex flex-row gap-5 place-items-top">
                <div className="z-10 relative shrink-0 items-start flex justify-center">
                  <Image
                    src={AINative}
                    alt="artificial intelligence"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="opacity-60 text-[18px] bg-clip-text leading-normal z-10 relative">
                  Build your high-performance AI-native SaaS application with
                  vector embeddings
                </div>
              </div>
              <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
                <div className="z-10 relative shrink-0 items-start  rounded-[20px] flex justify-center">
                  <Image
                    src={Customer}
                    alt="location pin"
                    width={32}
                    height={32}
                  />
                </div>
                <div className="opacity-60 text-[18px] bg-clip-text leading-normal z-10 relative">
                  Store your vector embeddings with your customer data,
                  improving efficiency and performance
                </div>
              </div>
              <div className="py-4 px-5 flex flex-row gap-5 place-items-center">
                <div className="z-10 relative shrink-0 items-start  rounded-[20px] flex justify-center">
                  <Image src={OSS} alt="location pin" width={40} height={40} />
                </div>
                <div className="opacity-60 text-[18px] bg-clip-text leading-normal z-10 relative">
                  Use open-source pgvector for Postgres to store, index, and
                  query embeddings for each tenant
                </div>
              </div>
            </div>
            <div className="flex lg:w-1/2">
              <Image
                src={AI}
                alt="intricate orange android"
                width={464}
                height={464}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-6 mt-7">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 pr-2 mx-auto lg:mx-0">
                <div className="border border-gray rounded-[24px] w-full text-center bg-footer bg-center overflow-hidden h-full relative">
                  <div className="p-10 flex flex-col gap-4 lg:-mt-[13%] xl:-mt-[8%]">
                    <div className="flex flex-row items-end gap-2 max-w-[90%]">
                      <div className="border border-[#393939] rounded-[36px] p-1 shrink-0">
                        <Image
                          src={PersonCircle}
                          alt="location pin"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="text-left border border-[#393939] rounded-[20px] px-[20px] py-[12px] opacity-60 bg-[#000]">
                        Could you share the key design decisions we made in the
                        company last month based on our technical docs?
                      </div>
                    </div>
                    <div className="flex flex-row items-end gap-2 max-w-[90%] ml-auto">
                      <div className="text-left border border-[#131313] rounded-[20px] px-[20px] py-[12px] bg-[#1F2123]">
                        Sure, I can help with that. Here are the key design
                        decisions we made last month
                        <br />
                        1. Decided to create a new region in Europe.
                        <br />
                        2. Store the logs in S3 for long term storage
                      </div>
                      <div className="border border-[#fff] rounded-[36px] p-1 shrink-0 bg-icon">
                        <Image
                          src={RobotCircle}
                          alt="location pin"
                          width={24}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-[#101010] flex flex-col gap-2 absolute bottom-0 left-0 right-0">
                    <div className="bg-gradient-text bg-clip-text text-transparent leading-normal text-[12px] z-10 relative">
                      Integrated with
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <div className="w-1/3 flex justify-center">
                        <Image
                          src={OpenAI}
                          alt="location pin"
                          width={100}
                          height={28}
                        />
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <Image
                          src={HuggingFace}
                          alt="location pin"
                          width={137}
                          height={36}
                        />
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <Image
                          src={Replicate}
                          alt="location pin"
                          width={104}
                          height={24}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ChatBlurbStacked />
              <div className="lg:w-1/2 lg:pl-2 mx-auto lg:mx-0 md:w-[77vw] w-[90vw] overflow-hidden overflow-x-scroll">
                <div className="border border-gray rounded-[24px] px-8 py-3 w-full bg-[#000] h-full relative overflow-hidden">
                  <div className="absolute bottom-0 bg-fader left-0 right-0 top-[70%]"></div>
                  <div className="pb-8">
                    <CodeSample />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <ChatBlurb />
              <div className="lg:w-1/2 flex-col justify-start gap-4 pl-2 flex mx-auto lg:mx-0">
                <div className="flex flex-row gap-3">
                  <Image src={Store} alt="brain" width={24} height={24} />
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Store vector embeddings per tenant or share embeddings
                    across tenants
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <Image
                    src={Deploy}
                    alt="settings cog"
                    width={24}
                    height={24}
                  />
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Deploy embeddings closer to your customers for latency or
                    compliance needs
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <Image src={Query} alt="person icon" width={24} height={24} />
                  <div className="opacity-60 text-[18px] bg-clip-text">
                    Index embeddings and query them efficiently
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
