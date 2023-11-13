import Container from "../_components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { glob } from "glob";
import Divider from "../_components/common/Divider";
import { Authors } from "./_components/Authors";
import { Metadata } from "./_components/Metadata";
import { parseMetadata } from "./_components/parseMetadata";
import algoliasearch from "algoliasearch/lite";
import Footer from "./_components/Footer";
import Search from "./_components/Search";
import Hit from "./_components/Search/Hit";
import Coffee from "@/public/blog/coffee.webp";
import { RefinementList } from "./_components/Search/RefinementList";
import uniq from "lodash/uniq";
type Props = {
  fileName: string;
  title: string;
  authors: string[];
  content: string;
  sizzle: string;
  image?: string;
};

const searchClient = algoliasearch(
  String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID),
  String(process.env.ALGOLIA_API_KEY)
);
const index = searchClient.initIndex("blog");
export const metadata = {
  title: "niledatabase Blog",
  description: "All things database SaaS",
};
function HeroArticle(props: Props) {
  const { fileName, title, authors: _authors, content, sizzle, image } = props;
  const { publishDate, slug, readLength } = parseMetadata(fileName, content);
  return (
    <Link href={`/blog/${slug}`} className="mt-12 -mb-10">
      <div className="flex flex-col xl:flex-row gap-16">
        <div className="bg-[#2D2D2D] rounded-xl overflow-hidden flex-shrink-0 items-center justify-center flex">
          {image ? (
            <Image
              className="aspect-video w-full"
              alt={image}
              width={550}
              height={347}
              src={`/blog/${image}`}
            />
          ) : (
            <Image
              className="aspect-video w-full"
              alt="coffee"
              width={550}
              height={347}
              src={Coffee}
            />
          )}
        </div>
        <div className="flex justify-center flex-col">
          <Metadata
            publishDate={publishDate}
            readLength={readLength}
            title={title}
            sizzle={sizzle}
          />
          <Authors authors={_authors} />
        </div>
      </div>
    </Link>
  );
}

export default async function Blog() {
  const [mostRecent]: any = await glob("app/blog/**.mdx");
  let hits: any[] = [];

  // @ts-expect-error - this exists.
  await index.browseObjects({
    query: "",
    batch: (batch: any) => {
      hits = hits.concat(batch);
    },
  });

  const refinements: string[] = hits.reduce((accum, hit) => {
    return accum.concat(hit.tags);
  }, []);
  const refinementItems = uniq(refinements);

  const { default: FirstArticle, metadata } = await import(`${mostRecent}`);
  return (
    <Container background={null}>
      <div className="container mx-auto">
        <div className="px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
          <HeroArticle
            fileName={mostRecent}
            {...metadata}
            content={FirstArticle}
          />
          <Divider />
          <div className="relative">
            <RefinementList items={refinementItems} />
            <Search />
          </div>
          <Hits initialHits={hits} />
          <Divider />
          <Footer />
        </div>
      </div>
    </Container>
  );
}

function Hits({ initialHits }: { initialHits: any[] }) {
  return (
    <div className="flex flex-row flex-wrap justify-start server-side-hits">
      {initialHits.map((hit) => {
        return <Hit hit={hit} key={hit.objectID} />;
      })}
    </div>
  );
}
