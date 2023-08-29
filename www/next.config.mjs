/** @type {import('next').NextConfig} */
import nextMdx from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

const withMdx = nextMdx({
  extension: /.mdx?$/,
  options: {
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

const nextConfig = {};

export default withMdx(nextConfig);
