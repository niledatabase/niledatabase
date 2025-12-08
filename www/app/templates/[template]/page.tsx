import loadTemplates from '../dataFetcher';
import { notFound } from 'next/navigation';
import Markdown from './Markdown';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Container from '@/app/_components/common/Container';
import { HeroBottom } from '@/app/_components/common/Hero';
import Divider from '@/app/_components/common/Divider';
import Image from 'next/image';
import { sizes } from '@/app/_components/common/sizes';

import cleanTemplateReadme from '../_build/cleanTemplateReadme.mjs';
import Heading from '@/app/_components/common/Heading';

type PageProps = {
  params?: Promise<{
    template?: string;
  }>;
};

export default async function TemplateDetail(pageProps: PageProps) {
  const params = await pageProps.params;
  const templates = await loadTemplates();
  const paramTemplate = String(params?.template);

  const template = templates.find(
    (template) => template.name === decodeURIComponent(paramTemplate),
  );

  if (!template) {
    return notFound();
  }

  const fileName = cleanTemplateReadme(template);

  let content;
  try {
    const location = path.resolve(`app/templates/_build/readmes/${fileName}`);
    console.log('attempting to locate', location);
    content = fs.readFileSync(location, 'utf-8');
  } catch (e) {
    console.log('not found');
    // build failed (probably this as a private repo, get it locally instead)
    try {
      const localFile = `${fileName
        .replace('niledatabase.niledatabase.blob.main', '')
        .replace('README.md', '')
        .split('.')
        .join('/')}README.md`;
      const location = path.resolve(
        path.join(__dirname, '../../../../../../', localFile),
      );
      console.log('attempting to locate', location);

      content = fs.readFileSync(location, 'utf-8');

      console.log('found', location);
    } catch (e) {
      console.log('not found');
    }
  }
  if (!content) {
    return notFound();
  }
  const { metadata, name, imageSrc, demoUrl } = template;
  const linkUrl = `https://github.com${template.readmeUrl
    .replace('https://github.com', '')
    .replace('README.md', '')
    .replace('/blob/', '/tree/')}`;

  return (
    <Container background={null}>
      <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
        <div className="mb-5 flex max-w-lg flex-col pr-4 pt-10 lg:w-1/3">
          <div className="w-full">
            <Heading text={name} textAlign="left" />
            {Object.keys(metadata).map((key) => {
              const val = metadata[key];
              return (
                <div
                  key={`${key}-${val}`}
                  className="flex flex-row justify-between gap-8 border-b border-b-[#1B1B1B] py-3 last-of-type:border-none"
                >
                  <div className="whitespace-nowrap text-lg opacity-60">
                    {key}
                  </div>
                  <div className="text-right text-lg opacity-60">{val}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-row gap-4">
            <Link href={demoUrl} className="w-full" target="_blank">
              <button className="gradientButton w-full p-2 font-medium after:rounded-md">
                Demo
              </button>
            </Link>
            <Link href={linkUrl} className="w-full" target="_blank">
              <button className="gradientBorderButton h-full w-full font-medium before:rounded-md">
                Repo
              </button>
            </Link>
          </div>
        </div>
        <div className="border-r border-r-[#1B1B1B]"></div>
        <div className="pl-4">
          <Image
            className="rounded-md"
            src={imageSrc}
            alt={`screen shot for ${name} template`}
            width={640}
            height={640}
            sizes={sizes}
            priority
          />
          <article className="prose prose-invert mt-4 w-full flex-1">
            <Markdown contents={content} />
          </article>
        </div>
      </div>
      <Divider />
      <HeroBottom />
    </Container>
  );
}
