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

    console.log(path);
    const metadataRoute = {
      url: `https://www.thenile.dev/${path}`,
      lastModified: file.mtime ? new Date(file.mtime) : new Date(),
      changeFrequency: "daily" as "daily",
      priority: 0.7,
    };
    pages.push(metadataRoute);
  }
  return [
    ...pages,
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
      url: "https://www.thenile.dev/docs",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.thenile.dev/templates",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
