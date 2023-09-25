import Container from "../_components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { glob } from "glob";
import Divider from "../_components/common/Divider";
import { Authors } from "./_components/Authors";
import { Metadata } from "./_components/Metadata";
import { parseMetadata } from "./_components/parseMetadata";
import Footer from "./_components/Footer";
import Search from "./_components/Search";

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

export default async function Blog() {
  const [mostRecent]: any = await glob("app/blog/**.mdx");
  const { default: FirstArticle, metadata } = await import(`${mostRecent}`);
  return (
    <Container background={null}>
      <HeroArticle fileName={mostRecent} {...metadata} content={FirstArticle} />
      <Divider />
      <Search />
      <Divider />
      <Footer />
    </Container>
  );
}
