import { glob } from "glob";
import ignore from "./globIgnore.mjs";
import { processFile } from "./processFile.mjs";

const BASE_ORDER = 0;

function sortOrder(a, b) {
  return (a?.order || BASE_ORDER) - (b?.order || BASE_ORDER);
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
          const { metadata } = await processFile(path);
          existingItem = {
            name: segment,
            ...metadata,
          };
        } else {
          existingItem = {
            name: segment,
            items: [],
            order: BASE_ORDER,
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
          item.order = nestedChild?.order ?? BASE_ORDER;
        }
        if (indexChild) {
          item.order = indexChild?.order ?? BASE_ORDER;
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
    ignore,
  });
  const out = await generateNestedObjects(results.sort());
  if (out.length > 0) {
    files.push(out);
  }

  return files;
}
