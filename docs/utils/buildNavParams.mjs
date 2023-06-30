import fs from "node:fs";
import { glob } from "glob";
export async function buildNavParams() {
  const files = await glob(`app/guides/**/*.mdx`);
  return files.map(
    // get the header from the 1st #
    (file) => {
      const content = fs.readFileSync(file, "utf-8");
      const matches = /#\s(.+)/.exec(content);
      const localFile = file.replace(/^.+\[\[...slug\]\]/, "");
      const parts = localFile.split("/");
      if (matches) {
        const [, header] = matches;
        return { header, file: localFile, slug: parts };
      }
      return { file: localFile, slug: parts };
    }
  );
}
