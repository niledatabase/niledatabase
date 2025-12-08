import { glob } from "glob";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const files = await glob(
    [
      "app/blog/**/*.mdx",
      "app/careers/**/*.mdx",
      // do something about templates
    ],
    { stat: true, withFileTypes: true }
  );

  const pages = [];
  for (const file of files) {
    const path = file
      .relative()
      .replace(".mdx", "")
      .replace("/[[...slug]]", "")
      .replace("/index", "")
      .replace(/^app\//, "");

    const metadataRoute = {
      url: `https://www.thenile.dev/${path}`,
      lastModified: file.mtime ? new Date(file.mtime) : new Date(),
      changeFrequency: "daily" as "daily",
      priority: 0.7,
    };
    pages.push(metadataRoute);
  }

  let docsPages: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch("https://nile.mintlify.app/sitemap.xml");
    if (response.ok) {
      const xml = await response.text();
      const urlRegex = /<url>(.*?)<\/url>/gs;
      const locRegex = /<loc>(.*?)<\/loc>/;
      const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/;

      let match;
      while ((match = urlRegex.exec(xml)) !== null) {
        const urlBlock = match[1];
        const locMatch = locRegex.exec(urlBlock);
        const lastmodMatch = lastmodRegex.exec(urlBlock);

        if (locMatch && locMatch[1]) {
          let url = locMatch[1];
          // Ensure www.thenile.dev
          url = url.replace("https://thenile.dev", "https://www.thenile.dev");

          docsPages.push({
            url,
            lastModified: lastmodMatch ? new Date(lastmodMatch[1]) : new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error fetching docs sitemap:", error);
  }

  return [
    ...pages,
    ...docsPages,
    {
      url: "https://www.thenile.dev/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.thenile.dev/about-us",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.thenile.dev/community",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.thenile.dev/pricing",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://www.thenile.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.thenile.dev/templates",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
