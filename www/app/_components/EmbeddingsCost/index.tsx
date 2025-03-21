import { Block } from "../block";
import { NewHeading } from "../common/NewHeading";
import HoverEffect from "./HoverEffect";

export default function EmbeddingsCost() {
  return (
    <div className="container mx-auto xl:px-24 mt-32">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex justify-center flex-col items-center">
            <NewHeading>
              Customer-specific vector embeddings at 10x lower cost
            </NewHeading>
          </div>
          <div>
            <div className="flex justify-center flex-col items-center">
              <div className="leading-[20px] text-[16px] xl:text-[24px] xl:leading-[24px] text-center max-w-[823px]">
                Use open-source pgvector extension to build multi-tenant RAG
                applications. Store your vector embeddings and your tenant data
                in one database
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row gap-20 flex-col-reverse">
          <div className="flex flex-col gap-6 flex-1">
            <div className="bg-orange rounded-[20px]">
              <Block
                title="Cost optimized"
                subTitle="Built on object storage and shared compute to be 10x lower cost"
                href="/docs/ai-embeddings"
              />
            </div>
            <div className="bg-purple rounded-[20px]">
              <Block
                title="Limitless embeddings"
                subTitle="Scale to billions of vector embeddings across thousands of tenants"
                href="/docs/ai-embeddings"
              />
            </div>
            <div className="bg-blue rounded-[20px]">
              <Block
                title="Low latency and performance"
                subTitle="Deploy embeddings closer to customer and LLMs for latency and compliance needs with one database"
                href="/docs/ai-embeddings"
              />
            </div>
          </div>
          <HoverEffect />
        </div>
      </div>
    </div>
  );
}
