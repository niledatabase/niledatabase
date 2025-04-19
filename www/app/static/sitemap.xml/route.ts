export async function GET() {
  const entries = [
    {
      url: "https://www.thenile.dev/",
      changefreq: "yearly",
      priority: 1,
    },
    {
      url: "https://www.thenile.dev/about-us",
      changefreq: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.thenile.dev/community",
      changefreq: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.thenile.dev/pricing",
      changefreq: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.thenile.dev/templates",
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.thenile.dev/auth",
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.thenile.dev/blog",
      changefreq: "monthly",
      priority: 0.5,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
