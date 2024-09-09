import { Block } from "../block";
import HoverEffect from "./HoverEffect";

export default function EmbeddingsCost() {
  return (
    <div className="container mx-auto lg:px-24 mt-48">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center flex-col items-center">
            <div className="text-[32px] leading-[32px] lg:text-[64px] lg:leading-[64px] text-center w-5/6">
              Customer-specific vector embeddings at 10x lower cost
            </div>
          </div>
          <div>
            <div className="flex justify-center flex-col">
              <div className="leading-[20px] text-[16px] lg:text-[24px] lg:leading-[24px] text-center">
                Use open-source pgvector extension to build multi-tenant RAG
                applications. Store your vector embeddings and your tenant data
                in one database
              </div>
            </div>
          </div>
        </div>
        <div className="flex xl:flex-row gap-20 flex-col-reverse">
          <div className="flex flex-col gap-6">
            <div className="bg-orange rounded-lg">
              <Block
                title="Cost optimized"
                subTitle="Built on object storage and shared compute to be 10x lower cost"
                href="/pricing"
              />
            </div>
            <div className="bg-purple rounded-lg">
              <Block
                title="Limitless embeddings"
                subTitle="Scale to billions of vector embeddings across thousands of tenants"
                href="/pricing"
              />
            </div>
            <div className="bg-blue rounded-lg">
              <Block
                title="Low latency and performance"
                subTitle="Deploy embeddings closer to customer and LLMs for latency and compliance needs with one database"
                href="/pricing"
              />
            </div>
          </div>
          <HoverEffect />
        </div>
      </div>
    </div>
  );
}
