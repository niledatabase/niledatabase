import { Block } from '../block';
import { NewHeading } from '../common/NewHeading';
import HoverEffect from './HoverEffect';

export default function EmbeddingsCost() {
  return (
    <div className="container mx-auto mt-32 xl:px-24">
      <div className="flex flex-col gap-16">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <NewHeading>
              Customer-specific vector embeddings at 10x lower cost
            </NewHeading>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <div className="max-w-[823px] text-center text-[16px] leading-[20px] xl:text-[24px] xl:leading-[24px]">
                Use open-source pgvector extension to build multi-tenant RAG
                applications. Store your vector embeddings and your tenant data
                in one database
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-20 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <div className="rounded-[20px] bg-orange">
              <Block
                title="Cost optimized"
                subTitle="Built on object storage and shared compute to be 10x lower cost"
                href="/docs/ai-embeddings"
              />
            </div>
            <div className="rounded-[20px] bg-purple">
              <Block
                title="Limitless embeddings"
                subTitle="Scale to billions of vector embeddings across thousands of tenants"
                href="/docs/ai-embeddings"
              />
            </div>
            <div className="rounded-[20px] bg-blue">
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
