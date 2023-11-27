import Container from "@/app/_components/common/Container";
import Heading from "@/app/_components/common/Heading";
import { glob } from "glob";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { slug: string[] } };
async function getPosting(props: Props) {
  const {
    params: { slug },
  } = props;
  const [lastSlug] = slug.reverse();
  const files = await glob("app/careers/**.mdx");
  const file = files.find((file) => {
    return file.includes(lastSlug);
  });

  if (!file || !file[0]) {
    return notFound();
  }
  const article = file.split("/").reverse();
  const { default: Article, metadata } = await import(`../${article[0]}`);
  return { metadata, Article };
}
export default async function CareerPost(props: Props) {
  const { Article, metadata } = await getPosting(props);
  return (
    <Container background={null}>
      <div className="container mx-auto prose prose-invert">
        <div className="mt-5 flex flex-col items-center md:items-start">
          <Article />
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
  const career = await getPosting(props);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    ...career.metadata,
    title: `Nile Careers - ${career.metadata.title}`,
    description: career.metadata.title,
    openGraph: {
      images: [career.metadata.image, ...previousImages],
    },
  };
}
