// mdx seems to be the only extention that works
export default function (config) {
  return `${config.readmeUrl
    .replace("https://github.com/", "")
    .replace(/\//g, ".")}`;
}
