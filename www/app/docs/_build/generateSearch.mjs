import dotenv from "dotenv";
import React from "react";
import { glob } from "glob";
import algoliasearch from "algoliasearch";
import path from "node:path";
import ignore from "./globIgnore.mjs";
import { fileURLToPath } from "url";
import { renderToStaticMarkup } from "react-dom/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.LOCAL === "true") {
  const envPath = path.resolve(__dirname, `../../../.env.local`);
  console.log(envPath);
  dotenv.config({ path: envPath });
}

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

// the algolia api and this byteLimit are not exact. Obligatory over 9000?!
const limitStringToBytes = (htmlString, id, byteLimit = 9472) => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(htmlString);

  if (encoded.length > byteLimit) {
    const sliced = encoded.slice(0, byteLimit);
    const decoder = new TextDecoder("utf-8", { fatal: true });

    try {
      return decoder.decode(sliced);
    } catch (error) {
      // In case a multi-byte character was cut off, slice further to remove incomplete chars
      const safeSliced = encoded.slice(0, byteLimit - 1);
      return decoder.decode(safeSliced);
    }
  }

  return htmlString; // Return the original string if under byte limit
};

async function run() {
  const files = await glob(`app/docs/**`, {
    ignore,
    nodir: true,
  });
  const out = [];
  for (const fileName of files) {
    const obj = {};
    const file = path.join(__dirname, "../../..", fileName);
    const { metadata, default: Content } = await import(file);
    const cleanedFileName = fileName
      .replace("app/docs/", "")
      .replace()
      .replace("[[...slug]]/", "")
      .replace(".mdx", "");

    obj.objectID = `docs/${cleanedFileName}`;
    obj.categories = obj.objectID.replace("docs/", "").split("/");
    // maybe a partial index is ok, until someone says something
    // a better bet would probably be remove ```sql .*``` and <table>.*</table>
    const output = renderToStaticMarkup(React.createElement(Content));
    const cleaned = output
      .toString()
      .replace(/<[^>]*>/gm, "")
      .replace(/app.*\.tsx/gm, "");

    obj.content = limitStringToBytes(cleaned, obj.objectID);
    obj.title = metadata.header;
    out.push(obj);
  }
  // clear the docs because they move and change a lot
  const index = client.initIndex("docs");
  await index.clearObjects();
  // upload to search service
  await upload(out);
}
run();
