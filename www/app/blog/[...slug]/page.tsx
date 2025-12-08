import Container from '@/app/_components/common/Container';
import { glob } from 'glob';
import { notFound } from 'next/navigation';
import 'highlight.js/styles/github-dark.css';
import { parseMetadata } from '../_components/parseMetadata';
import { Authors } from '../_components/Authors';
import Heading from '@/app/_components/common/Heading';
import Image from 'next/image';
import { Metadata, ResolvingMetadata } from 'next';
import Coffee from '@/public/blog/coffee.webp';
import BlogImageZoom from './ImageZoom';
import { TableOfContents } from '../_components/TableOfContents';
import fs from 'fs';
import { getHeadings, slugify } from '../_components/addHeadingIds';
import SocialButtons from '../_components/SocialButtons';
import { MouseEvent } from 'react';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string[] }> };

async function getBlog(props: Props) {
  const params = await props.params;
  const { slug } = params;

  const [lastSlug] = slug.reverse();
  const files = await glob('app/blog/**.mdx');
  const file = files.find((file) => {
    return file.includes(`${lastSlug}.mdx`);
  });

  if (!file || !file[0]) {
    return notFound();
  }

  // Read the file content and get headings
  const content = fs.readFileSync(file, 'utf-8');
  const headings = getHeadings(content);

  const article = file.split('/').reverse();
  const { default: Article, metadata } = await import(`../${article[0]}`);
  const { publishDate, readLength } = parseMetadata(file, Article);
  return { metadata, publishDate, readLength, Article, headings };
}

export default async function BlogPage(props: Props) {
  const { metadata, publishDate, readLength, Article, headings } =
    await getBlog(props);

  const handleCopyLink = (e: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Container background={null}>
      <BlogImageZoom />
      <main className="mx-auto mt-12 max-w-6xl px-4 lg:px-8">
        <div className="flex justify-end gap-20">
          {/* Main Content */}
          <div className="order-first w-full lg:w-[80%]">
            {/* Title */}
            <Heading
              text={metadata.title}
              textAlign="left"
              className="transition-all duration-300 ease-in-out hover:opacity-90"
            />

            {/* Metadata: Date, Read Time, Authors */}
            <div className="my-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
              <div className="flex flex-row items-center gap-3 text-sm tracking-wide">
                <div className="opacity-60 transition-opacity duration-200 hover:opacity-80">
                  {publishDate}
                </div>
                <div className="text-[10px] opacity-[.43]">●</div>
                <div className="opacity-60 transition-opacity duration-200 hover:opacity-80">
                  {readLength} min read
                </div>
                <div className="text-[10px] opacity-[.43]">●</div>
                <Authors authors={metadata.authors} />
              </div>

              {/* Social Links and Utilities */}
              <div className="hidden sm:block">
                <SocialButtons />
              </div>
            </div>

            {/* Featured Image */}
            <div className="group relative mb-6 flex w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#1c1c1c] bg-[#2D2D2D] transition-all duration-300 ease-in-out hover:border-opacity-50 hover:shadow-lg">
              {metadata?.image ? (
                <Image
                  className="w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  data-image-zoom-disabled
                  alt={metadata.image}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  src={`/blog/${metadata.image}`}
                  style={{
                    height: 'auto',
                    aspectRatio: '16/9',
                  }}
                />
              ) : (
                <Image
                  className="w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  data-image-zoom-disabled
                  alt="coffee"
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  src={Coffee}
                  style={{
                    height: 'auto',
                    aspectRatio: '16/9',
                  }}
                />
              )}
            </div>

            {/* Article Content */}
            <article className="mt-4">
              <div className="prose prose-invert max-w-none prose-headings:mb-4 prose-headings:mt-12 prose-headings:font-medium prose-headings:text-white prose-h2:text-[32px] prose-h2:leading-[1.3] prose-h2:tracking-[-0.02em] prose-h3:text-[24px] prose-h3:leading-[1.3] prose-h3:tracking-[-0.02em] prose-p:mb-6 prose-p:text-[18px] prose-p:leading-[1.6] prose-p:text-[#D9D9D9] prose-a:transition-colors prose-a:duration-200 prose-blockquote:my-6 prose-blockquote:border-l-2 prose-blockquote:border-opacity-50 prose-blockquote:pl-6 prose-blockquote:italic prose-strong:font-medium prose-strong:text-white prose-code:rounded prose-code:bg-[#1C1C1C] prose-code:p-1 prose-code:text-[16px] prose-code:leading-[1.6] prose-pre:my-6 prose-pre:rounded-xl prose-pre:bg-[#1C1C1C] prose-pre:p-6 prose-pre:shadow-md prose-ul:my-6 prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:my-1 prose-li:pl-6 prose-li:text-[18px] prose-li:leading-[1.6] prose-li:text-[#D9D9D9] prose-img:rounded-lg prose-img:shadow-md prose-img:transition-all prose-img:duration-300 prose-img:hover:shadow-lg [&>*]:!mx-0 [&>*]:!px-0 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-white/60 [&_ul>li]:before:content-['•']">
                <Article />
              </div>
            </article>
          </div>

          {/* Table of Contents */}
          <div className="mt-4 hidden w-[18%] flex-shrink-0 opacity-90 transition-opacity duration-300 hover:opacity-100 lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const blog = await getBlog(props);
  const previousImages = (await parent).openGraph?.images || [];
  const params = await props.params;
  return {
    ...blog.metadata,
    description: blog.metadata.sizzle,
    openGraph: {
      images: [blog.metadata.image, ...previousImages],
    },
    alternates: {
      canonical: `/blog/${params.slug.join('/')}`,
    },
  };
}
