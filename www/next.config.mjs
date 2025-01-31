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
  // Configure page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  
  // Exclude docs from the build
  webpack: (config, { isServer }) => {
    // Add a rule to exclude the docs directory
    config.module.rules.unshift({
      test: /\.(js|jsx|ts|tsx|mdx)$/,
      exclude: /app\/docs/,
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
