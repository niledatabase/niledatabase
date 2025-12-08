// mdx seems to be the only extension that works
export default function (config) {
  return `${config.readmeUrl
    .replace('https://github.com/', '')
    .replace(/\//g, '.')}`;
}
