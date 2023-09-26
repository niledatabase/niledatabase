import fs from "node:fs";

export async function processFile(file) {
  // get the header from the 1st # - can't import because this also runs at build time
  const content = fs.readFileSync(file, "utf-8");
  const firstHeader = /#\s(.+)/.exec(content);
  const maybeHeader = /title:\s['"](.+)['"]/.exec(content);
  const maybeOrder = /order:\s(-?\d+)/.exec(content);
  const maybeMethod = /method:\s['"](.\w+)['"]/.exec(content);
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
  if (maybeMethod) {
    const [, method] = maybeMethod;
    baseResponse.method = method;
  }

  if (maybeOrder) {
    const [, order] = maybeOrder;
    baseResponse.order = Number(order);
  }
  return { metadata: baseResponse, content };
}
