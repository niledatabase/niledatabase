import "dotenv/config";
import { glob } from "glob";
import algoliasearch from "algoliasearch";
import path from "node:path";
import ignore from "../../app/docs/_build/globIgnore.mjs";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { processFile } from "../../app/docs/_build/processFile.mjs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

async function upload(output) {
  return new Promise((resolve) => {
    const index = client.initIndex("docs");

    index
      .saveObjects(output)
      .then(() => {
        console.log("indexed docs output");
        resolve();
      })
      .catch(console.error);
  });
}

async function generate() {
  const files = await glob(`app/docs/**`, {
    ignore,
    nodir: true,
  });
  const out = [];

  for (const fileName of files) {
    const file = path.join(__dirname, "../app/www/../../../", fileName);

    const { metadata } = await processFile(file);
    const { default: Component } = await import(file);
    const output = renderToStaticMarkup(React.createElement(Component));
    const startPos = metadata.slug.findIndex((item) => item === "docs");
    const cleaned = output
      .replace(/<(pre)(.|\n)*?(pre)>/gm, "")
      .split("\n")
      .filter(Boolean);
    let idx = 0;
    let lastHeader = metadata.header;
    for (const content of cleaned) {
      const obj = {};
      const [, heading] = content?.match(/<h\d>(.*)<\/h\d>/) ?? [];
      if (heading) {
        lastHeader = heading.replace(/<\/?(.*?)>/gm, "");
      }
      const santitized = content.replace(/<\/?(.*?)>/gm, "");
      obj.objectID = `${metadata.slug
        .filter((item) => item !== "index.mdx")
        .slice(startPos, metadata.slug.length)
        .join("/")
        .replace("[[...slug]]", "")
        .replace(".mdx", "")}`;

      obj.categories = obj.objectID.replace("docs/", "").split("/");
      obj.objectID = `${idx}-${obj.objectID}`;
      obj.header = lastHeader;
      obj.hash = lastHeader
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-");

      idx++;
      obj.content = santitized;
      if (santitized) {
        out.push(obj);
      }
    }
  }

  // upload to search service
  await upload(out);
}
generate();
