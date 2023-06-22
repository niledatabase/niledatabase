/** @type {import('next').NextConfig} */
import nextMdx from '@next/mdx'

const withMdx = nextMdx({
  extension: /.mdx?$/,
});

const nextConfig = {};

export default withMdx(nextConfig);
