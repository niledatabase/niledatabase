import fs from "node:fs";

// only strings for now
function addMethod(baseResponse, possibleValue, key) {
  if (possibleValue) {
    const [, value] = possibleValue;
    baseResponse[key] = value;
  }
}
export async function processFile(file) {
  // get the header from the 1st # - can't import because this also runs at build time
  const content = fs.readFileSync(file, "utf-8");

  const localFile = file.replace(/\/\[\[...slug\]\]/, "");
  const parts = localFile.split("/");
  parts.shift();
  const baseResponse = { file, slug: parts, order: 0 };

  const maybeHeader = /title:\s['"](.+)['"]/.exec(content);
  const firstHeader = /#\s(.+)/.exec(content);
  if (maybeHeader) {
    const [, header] = maybeHeader;
    baseResponse.header = header;
  } else if (firstHeader) {
    const [, header] = firstHeader;
    baseResponse.header = header;
  }

  // math is done on this, so don't use `addMethod`
  const maybeOrder = /order:\s(-?\d+)/.exec(content);
  if (maybeOrder) {
    const [, order] = maybeOrder;
    baseResponse.order = Number(order);
  }

  const maybeMethod = /method:\s['"](.\w+)['"]/.exec(content);
  addMethod(baseResponse, maybeMethod, "method");

  const maybeLocation = /location:\s['"](.\w+)['"]/.exec(content);
  addMethod(baseResponse, maybeLocation, "location");

  const maybeOffice = /office:\s['"](.\w+)['"]/.exec(content);
  addMethod(baseResponse, maybeOffice, "office");

  const maybeFullTime = /fullTime:\s['"](.\w+)['"]/.exec(content);
  addMethod(baseResponse, maybeFullTime, "fullTime");

  return { metadata: baseResponse, content };
}
