import { Block } from "../block";
import Video from "../Video";

export default function EmbeddingsCost() {
  return (
    <div className="container mx-auto px-24 mt-48">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center flex-col">
            <div className="text-[64px] leading-[64px] text-center">
              Customer-specific vector
            </div>
            <div className="text-[64px] leading-[64px] text-center">
              embeddings at 10x lower cost
            </div>
          </div>
          <div>
            <div className="flex justify-center flex-col ">
              <div className="text-[24px] leading-[24px] text-center">
                Use open-source pgvector extension to build multi-tenant RAG
              </div>
              <div className="text-[24px] leading-[24px] text-center">
                applications. Store your vector embeddings and your tenant data
                in one
              </div>
              <div className="text-[24px] leading-[24px] text-center">
                database
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-20">
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
          <div className="flex-1 flex items-center flex-col">
            <Video
              poster="earth.webp"
              src="earth.mp4"
              className="aspect-square max-w-xl"
            />
            <Video poster="globe.webp" src="global.mp4" />
          </div>
        </div>
      </div>
    </div>
  );
}
