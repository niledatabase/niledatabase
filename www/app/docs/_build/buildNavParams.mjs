import fs from "node:fs";
import { glob } from "glob";

function sortOrder(a, b) {
  return (a?.order || 0) - (b?.order || 0);
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
      }

      currentLevel = existingItem.items;
    }
  }
  function setOrder(items) {
    for (const item of items) {
      if (!item.order && item.items) {
        const slugChild = item.items.find(
          (item) => item.name === "[[...slug]]"
        );
        const indexChild = item.items.find((item) => item.name === "index.mdx");
        if (slugChild) {
          const nestedChild = item.items[0].items?.find(
            (item) => item.name === "index.mdx"
          );
          item.order = nestedChild.order;
        }
        if (indexChild) {
          item.order = indexChild.order;
        }
      }
      if (item.items) {
        setOrder(item.items);
      }
    }
  }

  setOrder(output);

  function sorter(obj) {
    if (obj instanceof Array) {
      obj.sort(sortOrder);
      for (let i = 0; i < obj.length; i++) {
        obj[i] = sorter(obj[i]);
      }
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = sorter(obj[key]);
        }
      }
    }

    return obj;
  }
  return sorter(output);
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

  return files;
}
