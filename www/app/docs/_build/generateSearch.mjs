import "dotenv/config";
import { glob } from "glob";
import algoliasearch from "algoliasearch";
import path from "node:path";
import ignore from "./globIgnore.mjs";
import { processFile } from "./processFile.mjs";
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

async function run() {
  const files = await glob(`app/docs/**`, {
    ignore,
    nodir: true,
  });
  const out = [];
  for (const fileName of files) {
    const obj = {};
    const file = path.join(__dirname, "../../..", fileName);
    const { metadata, content } = await processFile(file);
    const startPos = metadata.slug.findIndex((item) => item === "docs");
    obj.objectID = metadata.slug
      .filter((item) => item !== "index.mdx")
      .slice(startPos, metadata.slug.length)
      .join("/")
      .replace("[[...slug]]", "")
      .replace(".mdx", "");

    obj.categories = obj.objectID.replace("docs/", "").split("/");
    console.log(content);
    obj.content = content;
    obj.title = metadata.header;
    out.push(obj);
  }
  // clear the docs because they move and change a lot
  const index = client.initIndex('docs');
  await index.clearObjects();
  // upload to search service
  await upload(out);
}
run();
