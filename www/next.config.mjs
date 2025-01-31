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
            javascript: ["nextjs", "express"],
          },
        },
      ],
    ],
  },
});

const nextConfig = {
  // Configure page extensions to exclude docs
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'].map(ext => `((?!docs/).)*\\.${ext}$`),
  
  // Exclude docs from the build
  webpack: (config, { isServer }) => {
    // Exclude the entire docs directory from all rules
    config.module.rules.forEach(rule => {
      if (!rule.exclude) rule.exclude = [];
      if (Array.isArray(rule.exclude)) {
        rule.exclude.push(/app\/docs/);
      } else {
        rule.exclude = [rule.exclude, /app\/docs/].filter(Boolean);
      }
    });

    return config;
  },

  // Handle redirects for docs
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://nile.mintlify.app/docs',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: 'https://nile.mintlify.app/docs/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMdx(nextConfig);
