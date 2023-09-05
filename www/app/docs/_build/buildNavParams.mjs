import fs from "node:fs";
import { glob } from "glob";

function sortOrder(a, b) {
  if (a?.order > b?.order) {
    return 1;
  }
  if (a?.order < b?.order) {
    return -1;
  }

  return 0;
}

async function processFile(file) {
  // get the header from the 1st # - can't import because this also runs at build time
  const content = fs.readFileSync(file, "utf-8");
  const firstHeader = /#\s(.+)/.exec(content);
  const maybeHeader = /title:\s"(.+)"/.exec(content);
  const maybeOrder = /order:\s(-?\d+)/.exec(content);
  const localFile = file.replace(/\/\[\[...slug\]\]/, "");
  const parts = localFile.split("/");
  parts.shift();
  const baseResponse = { file, slug: parts, order: 0 };
  if (maybeHeader) {
    const [, header] = maybeHeader;
    baseResponse.header = header;
  } else if (firstHeader) {
    const [, header] = firstHeader;
    baseResponse.header = header;
  }

  if (maybeOrder) {
    const [, order] = maybeOrder;
    baseResponse.order = Number(order);
  }
  return baseResponse;
}

async function generateNestedObjects(input) {
  const output = [];

  for (const path of input) {
    const segments = path.split("/");

    let currentLevel = output;
    let existingItem = null;

    for (const segment of segments) {
      existingItem = currentLevel.find((item) => item.name === segment);

      if (!existingItem) {
        if (path.endsWith(".mdx")) {
          const payload = await processFile(path);
          existingItem = {
            name: segment,
            ...payload,
          };
        } else {
          existingItem = {
            name: segment,
            items: [],
            order: 0,
          };
        }
        currentLevel.push(existingItem);
        if (currentLevel.length > 1) {
          currentLevel.sort(sortOrder);
        }
      }
      currentLevel = existingItem.items;
    }
  }

  return output;
}

export async function buildNavParams() {
  const files = [];

  // do this instead of *.mdx, or parse the directories and figure out where things go. This seems easier.
  const results = await glob(`app/docs/**`, {
    ignore: [
      "app/docs",
      "**/*.tsx",
      "**/*.ts",
      "**/*.json",
      "**/*.mjs",
      "**/_components",
      "**/_build",
      "**/README.md",
      "**/Cards",
      "**/PageContent",
      "**/SideNavigation",
    ],
  });
  const out = await generateNestedObjects(results.sort());
  if (out.length > 0) {
    files.push(out);
  }
  files[0][0].items[0].items.sort((a, b) => {
    const indexA = a.items[0].items.find((item) => item.name === "index.mdx");
    const indexB = b.items[0].items.find((item) => item.name === "index.mdx");
    return sortOrder(indexA, indexB);
  });

  return files;
}
