import Container from '../_components/common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { glob } from 'glob';
import Divider from '../_components/common/Divider';
import { Authors } from './_components/Authors';
import { Metadata } from './_components/Metadata';
import { parseMetadata } from './_components/parseMetadata';
import Footer from './_components/Footer';

type Props = {
  fileName: string;
  title: string;
  authors: string[];
  content: string;
  sizzle: string;
  image?: string;
};

function HeroArticle(props: Props) {
  const { fileName, title, authors: _authors, content, sizzle, image } = props;
  const { publishDate, slug, readLength } = parseMetadata(fileName, content);
  return (
    <Link href={`/blog/${slug}`}>
      <div className="flex flex-row gap-16">
        <div className="bg-[#2D2D2D] rounded-xl w-[550px] h-[347px] overflow-hidden flex-shrink-0 items-center justify-center flex">
          {image ? (
            <Image
              alt={image}
              width={550}
              height={347}
              src={`/blog/${image}`}
            />
          ) : (
            <Image
              alt="coffee"
              width={550}
              height={347}
              src={`/blog/coffee.jpg`}
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

async function AsyncArticle({ fileName }: { fileName: string }) {
  const { default: Article, metadata } = await import(`${fileName}`);
  const { publishDate, slug, readLength } = parseMetadata(fileName, Article);
  return (
    <Link href={`/blog/${slug}`}>
      <div className="w-[384px]">
        <div className="bg-[#2D2D2D] rounded-xl w-[384px] h-[242px] overflow-hidden flex-shrink-0 mb-4 items-center justify-center flex">
          {metadata?.image ? (
            <Image
              alt={metadata.image}
              width={384}
              height={242}
              src={`/blog/${metadata.image}`}
            />
          ) : (
            <Image
              alt="coffee"
              width={384}
              height={242}
              src={`/blog/coffee.jpg`}
            />
          )}
        </div>
        <Metadata
          publishDate={publishDate}
          readLength={readLength}
          title={metadata?.title}
          sizzle={metadata?.sizzle}
        />
        <Authors authors={metadata?.authors} />
      </div>
    </Link>
  );
}
export default async function Blog() {
  const [mostRecent, ...remaining]: any = await glob('app/blog/**.mdx');
  const { default: FirstArticle, metadata } = await import(`${mostRecent}`);
  return (
    <Container hidePattern={true}>
      <HeroArticle fileName={mostRecent} {...metadata} content={FirstArticle} />
      <Divider />
      <div className="flex flex-wrap flex-row gap-8">
        {remaining.map((article: string) => {
          return <AsyncArticle key={article} fileName={article} />;
        })}
      </div>
      <Divider />
      <Footer />
    </Container>
  );
}
