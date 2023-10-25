import fs from "node:fs";
export const parseMetadata = (fileName: string, content: any) => {
  const [, publishDate] = /.+(\d{4}-\d{2}-\d{2}).+/.exec(fileName) ?? [];
  const [file] = fileName.split("/").reverse();
  const cleaned = file.replace(/\d{4}-\d{2}-\d{2}-/, "");
  const slug = cleaned.replace(".mdx", "");

  const _content = fs.readFileSync(fileName, "utf-8");
  const output = _content
    .toString()
    .replace(/<.+><\/.+>/gm, "")
    .replace(/\[.*?\]\(.*?\)/gm, "")
    .replace(/[#\.,\*\?\-:'!]/gm, "")
    .replace(/```.+```/gm, "");
  const words = output.split(/\s/);
  const readLength = Math.floor(words.length / 238);
  return {
    publishDate,
    slug,
    readLength,
  };
};
