import Container from "@/app/_components/common/Container";
import { glob } from "glob";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { parseMetadata } from "../_components/parseMetadata";
import { Authors } from "../_components/Authors";
import Heading from "@/app/_components/common/Heading";
import Image from "next/image";
import Footer from "../_components/Footer";
import Divider from "@/app/_components/common/Divider";
import { Metadata, ResolvingMetadata } from "next";
type Props = { params: { slug: string[] } };

async function getBlog(props: Props) {
  const {
    params: { slug },
  } = props;
  const [lastSlug] = slug.reverse();
  const files = await glob("app/blog/**.mdx");
  const file = files.find((file) => {
    return file.includes(lastSlug);
  });

  if (!file || !file[0]) {
    return notFound();
  }
  const article = file.split("/").reverse();
  const { default: Article, metadata } = await import(`../${article[0]}`);
  const { publishDate, readLength } = parseMetadata(file, Article);
  return { metadata, publishDate, readLength, Article };
}
export default async function BlogPage(props: Props) {
  const { metadata, publishDate, readLength, Article } = await getBlog(props);
  return (
    <Container background={null}>
      <div className="bg-[#2D2D2D] rounded-xl w-[800px] h-[505px] overflow-hidden flex-shrink-0 mb-4 items-center justify-center flex relative">
        {metadata?.image ? (
          <Image
            className="object-cover object-center h-full w-full absolute"
            alt={metadata.image}
            width={800}
            height={505}
            src={`/blog/${metadata.image}`}
          />
        ) : (
          <Image
            className="object-cover object-center h-full w-full absolute"
            alt="coffee"
            width={800}
            height={505}
            src={`/blog/coffee.jpg`}
          />
        )}
      </div>
      <div className="flex flex-row gap-3 items-center mb-5">
        <div className="opacity-60">{publishDate}</div>
        <div className="opacity-[.43] text-[10px]">●</div>
        <div className="opacity-60">{readLength} min read</div>
        <div className="opacity-[.43] text-[10px]">●</div>
        <Authors authors={metadata.authors} />
      </div>
      <Heading text={metadata.title} />
      <div className="prose prose-invert mt-5">
        <Article />
      </div>
      <Divider />
      <Footer />
    </Container>
  );
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const blog = await getBlog(props);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    ...blog.metadata,
    description: blog.metadata.sizzle,
    openGraph: {
      images: [blog.metadata.image, ...previousImages],
    },
  };
}
