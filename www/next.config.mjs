/** @type {import('next').NextConfig} */
import nextMdx from "@next/mdx";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import scala from "highlight.js/lib/languages/scala";
import sql from "highlight.js/lib/languages/sql";

const withMdx = nextMdx({
  extension: /.mdx?$/,
  options: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeHighlight,
        {
          ignoreMissing: true,
          languages: { scala, sql },
          aliases: {
            'javascript': ['nextjs', 'express']
          }
        },
      ],
    ],
  },
});

const nextConfig = {};

export default withMdx(nextConfig);
