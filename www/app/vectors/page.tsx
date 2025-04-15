import Container from "../_components/common/Container";
import { HeroBottom } from "../_components/common/Hero";
import arrow from "@/public/icons/arrow.svg";
import Image from "next/image";
import Logo from "@/public/githubLogo.svg";
import Link from "next/link";
import MultiTenantCodeEditor from "../auth/MultiTenantCodeEditor";
import VideoEmbed from "../auth/VideoEmbed";

const vectorExamples = {
  "nile.ts": `import { Nile } from '@niledatabase/client';

const nile = new Nile({
  apiKey: process.env.NILE_API_KEY,
});

// Create a vector index for a tenant
await nile.vectorIndexes.create({
  tenantId: 'my-tenant',
  name: 'product-embeddings',
  dimensions: 1536,
  metric: 'cosine',
});

// Insert vectors with metadata
await nile.vectors.insert({
  tenantId: 'my-tenant',
  indexName: 'product-embeddings',
  vectors: [
    {
      id: 'product-1',
      vector: [...], // 1536-dimensional vector
      metadata: {
        name: 'Premium Widget',
        category: 'electronics',
        price: 99.99
      }
    }
  ]
});

// Query vectors with metadata filtering
const results = await nile.vectors.query({
  tenantId: 'my-tenant',
  indexName: 'product-embeddings',
  vector: [...], // query vector
  filter: {
    metadata: {
      category: 'electronics',
      price: { $lt: 100 }
    }
  },
  limit: 10
});`,

  "python.py": `from nile import Nile

nile = Nile(api_key=os.getenv('NILE_API_KEY'))

# Create a vector index
nile.vector_indexes.create(
    tenant_id='my-tenant',
    name='product-embeddings',
    dimensions=1536,
    metric='cosine'
)

# Insert vectors with metadata
nile.vectors.insert(
    tenant_id='my-tenant',
    index_name='product-embeddings',
    vectors=[{
        'id': 'product-1',
        'vector': [...],  # 1536-dimensional vector
        'metadata': {
            'name': 'Premium Widget',
            'category': 'electronics',
            'price': 99.99
        }
    }]
)

# Query vectors with metadata filtering
results = nile.vectors.query(
    tenant_id='my-tenant',
    index_name='product-embeddings',
    vector=[...],  # query vector
    filter={
        'metadata': {
            'category': 'electronics',
            'price': {'$lt': 100}
        }
    },
    limit=10
)`
};

const cards = [
  {
    title: "Multi-tenant Vector Search",
    subTitle: "Scale to millions of namespaces with performance isolation. Each tenant gets their own vector indexes and compute resources.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  },
  {
    title: "Hybrid Search",
    subTitle: "Combine vector similarity search with full-text search and metadata filtering for more accurate and relevant results.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  },
  {
    title: "Cost Effective",
    subTitle: "Pay only for what you use with serverless compute options and efficient storage of less frequently accessed vectors.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  },
  {
    title: "Postgres Native",
    subTitle: "Built on Postgres, leveraging its battle-tested reliability and familiar tooling for vector operations at scale.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  }
];

function ViewOnGithub() {
  return (
    <Link href="https://github.com/niledatabase/nile" target="_blank">
      <button className="bg-[#000000] text-white transition-colors px-4 py-2 rounded-[10px] flex flex-row gap-2 items-center text-[16px] leading-[20px] h-11">
        <Image src={Logo} alt="github" width={20} height={20} />
        View on GitHub
      </button>
    </Link>
  );
}

export default function Vectors() {
  return (
    <Container background={null}>
      <div className="container mx-auto">
        <div className="sm:px-4 py-32 pb-10 xl:px-24 xl:py-48 md:px-12 md:py-24">
          <div className="flex gap-8 lg:gap-20 lg:flex-row flex-col">
            <div className="flex gap-8 flex-col lg:w-1/2">
              <h1 className="text-[42px] leading-[42px] lg:text-[96px] lg:leading-[96px] flex flex-col">
                <span>Vector Search for</span>
                <div className="flex flex-row whitespace-nowrap items-baseline">
                  <span className="bg-clip-text text-transparent bg-gradient-text subpixel-antialiased bg-black overflow-hidden whitespace-nowrap leading-[48px] lg:leading-[120px] font-bold">
                    B2B
                  </span>
                  <span className="ml-3">apps</span>
                </div>
              </h1>
              <h2 className="text-[16px] leading-[16px] xl:text-[20px] xl:leading-[20px] w-full">
                Multi-tenant, highly available, and cost-effective vector search built on Postgres. Scale to millions of vectors per tenant with performance isolation.
              </h2>
              <div className="flex flex-row gap-4 items-center">
                <Link href="https://console.thenile.dev/" target="_blank">
                  <button className="bg-blue text-black transition-colors px-4 py-2 rounded-[10px] flex flex-row gap-2 items-center text-[16px] leading-[20px] h-11">
                    Build for free
                    <Image
                      className="-ml-1 invert"
                      src={arrow}
                      alt="arrow"
                      width={16}
                      height={16}
                    />
                  </button>
                </Link>
                <ViewOnGithub />
              </div>
            </div>
            <div className="lg:w-1/2">
              <MultiTenantCodeEditor
                tabs={vectorExamples}
                defaultTab="nile.ts"
              />
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex justify-center flex-col gap-16">
            <div className="flex justify-center flex-col w-full items-center">
              <h2 className="text-[42px] leading-[42px] xl:text-[64px] xl:leading-[64px] lg:leading-[50px] lg:text-[50px] w-5/6 2xl:w-2/3 -tracking-[0.64px] text-left lg:text-center">
                Built for AI applications at scale
              </h2>
            </div>
            <div className="flex flex-col gap-16">
              {cards.map((card, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-16 justify-center items-start">
                  <div className="lg:w-1/2">
                    <div className="group transition-all max-w-[472px] min-h-[216px]">
                      <div className="p-6 flex flex-col max-w-[472px] flex-1 !justify-between min-h-[216px] h-full bg-[#000000]">
                        <div className="flex items-center gap-2">
                          <div className="brightness-100 transition-all duration-700">
                            {card.icon}
                          </div>
                          <div className="text-[24px] leading-[24px] font-medium brightness-100 bg-clip-text text-transparent bg-gradient-text duration-700">
                            {card.title}
                          </div>
                        </div>
                        <div className="text-[14px] leading-[20px] xl:text-[18px] xl:leading-[24px] lg:text-[16px] lg:leading-[18px] font-normal">
                          {card.subTitle}
                        </div>
                        <Link
                          className="text-[16px] leading-[24px] font-medium flex flex-row items-center gap-2"
                          href="https://www.thenile.dev/docs/vectors"
                        >
                          <div className="transition-colors border-b border-b-transparent hover:border-b-[#fff] flex flex-row items-center gap-2">
                            Learn more
                            <Image
                              src={arrow}
                              alt="arrow"
                              width={24}
                              height={24}
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="lg:w-1/2">
                      <MultiTenantCodeEditor
                        tabs={vectorExamples}
                        defaultTab="nile.ts"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
} 