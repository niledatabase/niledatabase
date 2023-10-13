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
  console.log(template);

  let content;
  try {
    content = fs.readFileSync(
      path.resolve(`app/templates/_build/readmes/${fileName}`),
      "utf-8"
    );
  } catch (e) {
    // build failed (probably this as a private repo, get it locally instead)
    try {
      const localFile = `${fileName
        .replace("niledatabase.niledatabase.blob.main", "")
        .replace("README.md", "")
        .split(".")
        .join("/")}README.md`;
      content = fs.readFileSync(
        path.join(__dirname, "../../../../../../", localFile),
        "utf-8"
      );
    } catch (e) {}
  }
  if (!content) {
    return notFound();
  }
  const { metadata, name, imageSrc, demoUrl } = template;
  const linkUrl = `https://github.com${template.readmeUrl
    .replace("https://github.com", "")
    .replace("README.md", "")
    .replace("/blob/", "/tree/")}`;

  return (
    <Container background={null}>
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
            <Link href={demoUrl} className="w-full" target="_blank">
              <button className="gradientButton font-medium p-2 w-full after:rounded-md">
                Demo
              </button>
            </Link>
            <Link href={linkUrl} className="w-full" target="_blank">
              <button className="gradientBorderButton font-medium h-full w-full before:rounded-md">
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
