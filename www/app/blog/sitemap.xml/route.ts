import { glob } from 'glob';

export async function GET() {
  const files = await glob('app/blog/**.mdx', {
    stat: true,
    withFileTypes: true,
  });

  const entries = files
    .map((file) => {
      const path = file
        .relative()
        .replace('.mdx', '')
        .replace('/[[...slug]]', '')
        .replace('/index', '')
        .replace(/^app\//, '')
        .replace(/\/\d{4}-\d{2}-\d{2}-/, '/');

      return `  <url>
    <loc>https://www.thenile.dev/${path}</loc>
    <lastmod>${
      file.mtime ? new Date(file.mtime).toISOString() : new Date().toISOString()
    }</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
