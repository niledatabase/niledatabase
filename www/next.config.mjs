/** @type {import('next').NextConfig} */
import nextMdx from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import scala from "highlight.js/lib/languages/scala";

const withMdx = nextMdx({
  extension: /.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeHighlight,
        {
          languages: { scala },
        },
      ],
    ],
  },
});

const nextConfig = {};

export default withMdx(nextConfig);
