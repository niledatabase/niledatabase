import Container from '../_components/common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { glob } from 'glob';
import Divider from '../_components/common/Divider';
import { Authors } from './_components/Authors';
import { Metadata as Meta } from './_components/Metadata';
import { parseMetadata } from './_components/parseMetadata';
import algoliasearch from 'algoliasearch/lite';
import Search from './_components/Search';
import Hit from './_components/Search/Hit';
import Coffee from '@/public/blog/coffee.webp';
import { RefinementList } from './_components/Search/RefinementList';
import uniq from 'lodash/uniq';
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
  String(process.env.ALGOLIA_API_KEY),
);
const index = searchClient.initIndex('blog');
export const metadata = {
  title: 'Blog | Nile Database',
  description: 'All things database SaaS',
  alternates: {
    types: {
      'application/atom+xml': '/blog/feed.atom',
    },
  },
};
export const dynamic = 'force-dynamic';
function HeroArticle(props: Props) {
  const { fileName, title, authors: _authors, content, sizzle, image } = props;
  const { publishDate, slug, readLength } = parseMetadata(fileName, content);
  return (
    <Link href={`/blog/${slug}`} className="-mb-10 mt-12">
      <div className="flex flex-col gap-16 xl:flex-row">
        <div className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#2D2D2D]">
          {image ? (
            <Image
              className="aspect-video w-full"
              data-image-zoom-disabled
              alt={image}
              width={550}
              height={347}
              src={`/blog/${image}`}
            />
          ) : (
            <Image
              className="aspect-video w-full"
              data-image-zoom-disabled
              alt="coffee"
              width={550}
              height={347}
              src={Coffee}
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <Meta
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
  const [mostRecent]: any = await glob('app/blog/**.mdx');
  let hits: any[] = [];

  //@ts-expect-error - this exists
  await index.browseObjects({
    batch: (batch: any) => {
      hits = hits.concat(batch);
    },
  });

  // const refinements: string[] = hits.reduce((accum, hit) => {
  // return accum.concat(hit.tags);
  // }, []);
  // const refinementItems = uniq(refinements);

  const [localFile] = mostRecent.split('/').reverse();
  const { default: FirstArticle, metadata } = await import(`./${localFile}`);
  return (
    <Container background={null}>
      <div className="container mx-auto">
        <div className="mt-32 px-4 pb-0 md:py-4 2xl:px-24 2xl:py-4">
          <div className="mb-32">
            <HeroArticle
              fileName={mostRecent}
              {...metadata}
              content={FirstArticle}
            />
          </div>
          <div className="bgDivider relative z-10 flex flex-1 flex-col pt-20 text-center align-middle">
            <Search />
          </div>
          <div className="mt-8">
            <Hits initialHits={hits} />
          </div>
        </div>
      </div>
    </Container>
  );
}

function Hits({ initialHits }: { initialHits: any[] }) {
  return (
    <div className="server-side-hits flex flex-row flex-wrap justify-start pt-4">
      {initialHits.map((hit) => {
        return <Hit hit={hit} key={hit.objectID} />;
      })}
    </div>
  );
}
