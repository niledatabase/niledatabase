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
import Heading from "@/app/_components/common/Heading";

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

  let content;
  try {
    const location = path.resolve(`app/templates/_build/readmes/${fileName}`);
    console.log("attempting to locate", location);
    content = fs.readFileSync(location, "utf-8");
  } catch (e) {
    console.log("not found");
    // build failed (probably this as a private repo, get it locally instead)
    try {
      const localFile = `${fileName
        .replace("niledatabase.niledatabase.blob.main", "")
        .replace("README.md", "")
        .split(".")
        .join("/")}README.md`;
      const location = path.resolve(
        path.join(__dirname, "../../../../../../", localFile)
      );
      console.log("attempting to locate", location);

      content = fs.readFileSync(location, "utf-8");

      console.log("found", location);
    } catch (e) {
      console.log("not found");
    }
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
      <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:items-start">
        <div className="flex lg:w-1/3 pr-4 flex-col mb-5 pt-10 max-w-lg">
          <div className="w-full">
            <Heading text={name} textAlign="left" />
            {Object.keys(metadata).map((key) => {
              const val = metadata[key];
              return (
                <div
                  key={`${key}-${val}`}
                  className="flex flex-row justify-between border-b border-b-[#1B1B1B] py-3 last-of-type:border-none gap-8"
                >
                  <div className="text-lg opacity-60 whitespace-nowrap">
                    {key}
                  </div>
                  <div className="text-lg opacity-60 text-right">{val}</div>
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
          <article className="prose prose-invert flex-1 w-full mt-4">
            <Markdown contents={content} />
          </article>
        </div>
      </div>
      <Divider />
      <HeroBottom />
    </Container>
  );
}
