import loadTemplates from "../dataFetcher";
import { notFound } from "next/navigation";
import Markdown from "./Markdown";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Container from "@/app/_components/common/Container";
import { HeroBottom } from "@/app/_components/common/Hero";
import Divider from "@/app/_components/common/Divider";
import Image from "next/image";
import { sizes } from "@/app/_components/common/sizes";

import cleanTemplateReadme from "../_build/cleanTemplateReadme.mjs";

type PageProps = {
  params?: {
    template?: string;
  };
};

export default async function TemplateDetail(pageProps: PageProps) {
  const { params } = pageProps;
  const templates = await loadTemplates();
  const paramTemplate = String(params?.template);

  const template = templates.find(
    (template) => template.name === decodeURIComponent(paramTemplate)
  );

  if (!template) {
    return notFound();
  }

  const fileName = cleanTemplateReadme(template);

  const content = fs.readFileSync(
    path.resolve(`app/templates/readmes/${fileName}`),
    "utf-8"
  );
  const { metadata, name, imageSrc } = template;
  const linkUrl = template.readmeUrl.replace(/\/blob.+/, "");

  return (
    <Container hidePattern={true}>
      <div className="flex flex-row w-full justify-around">
        <div className="flex w-1/3 pr-4 flex-col">
          <div className="w-full">
            <div className="text-[64px]">{name}</div>
            {Object.keys(metadata).map((key) => {
              const val = metadata[key];
              return (
                <div
                  key={`${key}-${val}`}
                  className="flex flex-row justify-between border-b border-b-[#1B1B1B] py-3 last-of-type:border-none"
                >
                  <div className="text-lg opacity-60">{key}</div>
                  <div className="text-lg opacity-60">{val}</div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <Link href={linkUrl} className="w-full">
              <button className="gradientButton font-medium p-2 w-full after:rounded-md">
                Use
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
          <article className="prose dark:prose-invert flex-1 w-full mt-4">
            <Markdown contents={content} />
          </article>
        </div>
      </div>
      <Divider />
      <HeroBottom />
    </Container>
  );
}
