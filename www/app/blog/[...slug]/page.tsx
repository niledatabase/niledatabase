import Container from "@/app/_components/common/Container";
import { glob } from "glob";
import { notFound } from "next/navigation";
import "highlight.js/styles/github-dark.css";
import { parseMetadata } from "../_components/parseMetadata";
import { Authors } from "../_components/Authors";
import Heading from "@/app/_components/common/Heading";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import Coffee from "@/public/blog/coffee.webp";
import BlogImageZoom from "./ImageZoom";

export const dynamic = "force-dynamic";
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
      <BlogImageZoom />
      <div className="container mx-auto prose prose-invert mt-56">
        <div className="bg-[#2D2D2D] rounded-xl aspect-video w-full overflow-hidden flex-shrink-0 mb-4 items-center justify-center flex relative border border-[#1c1c1c]">
          {metadata?.image ? (
            <Image
              className="object-cover object-center h-full w-full absolute"
              data-image-zoom-disabled
              alt={metadata.image}
              width={800}
              height={505}
              sizes="50vw"
              src={`/blog/${metadata.image}`}
              style={{
                width: "100%",
              }}
            />
          ) : (
            <Image
              className="object-cover object-center h-full w-full absolute"
              data-image-zoom-disabled
              alt="coffee"
              width={800}
              height={505}
              src={Coffee}
            />
          )}
        </div>
        <div className="md:px-4 md:py-4 pb-0 2xl:px-24 2xl:py-4">
          <div className="flex flex-col md:flex-row gap-3 items-center mb-5 w-full justify-center">
            <div className="flex flex-row justify-center items-center gap-3">
              <div className="opacity-60">{publishDate}</div>
              <div className="opacity-[.43] text-[10px]">●</div>
              <div className="opacity-60">{readLength} min read</div>
            </div>
            <div className="hidden md:block opacity-[.43] text-[10px]">●</div>
            <Authors authors={metadata.authors} />
          </div>
          <Heading text={metadata.title} />
          <div className="mt-5 flex flex-col items-center md:items-start">
            <Article />
          </div>
        </div>
      </div>
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
    alternates: {
      canonical: `/blog/${props.params.slug.join("/")}`,
    },
  };
}
