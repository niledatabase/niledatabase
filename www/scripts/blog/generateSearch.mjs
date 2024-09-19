import "dotenv/config";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { glob } from "glob";
import algoliasearch from "algoliasearch";
import path from "node:path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);

async function upload(output) {
  return new Promise((resolve) => {
    const index = client.initIndex("blog");
    index
      .saveObjects(output)
      .then(() => {
        console.log("indexed blog output");
        resolve();
      })
      .catch(console.error);
  });
}

async function run() {
  const files = await glob("app/blog/**.mdx");
  // remove the 1st for the search, since it will be handled separately
  files.shift();
  const out = [];
  for (const fileName of files) {
    const file = path.join(__dirname, "../app/www/../../../", fileName);
    const { metadata, default: Content } = await import(file);
    metadata.objectID = fileName;
    const output = renderToStaticMarkup(React.createElement(Content));
    const cleaned = output
      .toString()
      .replace(/<.+><\/.+>/gm, "")
      .replace(/\[.*?\]\(.*?\)/gm, "")
      .replace(/[#\.,\*\?\-:'!]/gm, "")
      .replace(/```.+```/gm, "")
      .split(/\s/);
    metadata.readLength = Math.floor(cleaned.length / 238);
    out.push(metadata);
  }
  // upload to search service
  await upload(out);
}
run();
