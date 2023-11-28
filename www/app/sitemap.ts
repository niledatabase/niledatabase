import { glob } from "glob";
import { MetadataRoute } from "next";

const files = glob([
  "app/blog/**.mdx",
  "app/docs/**.mdx",
  "app/careers/**.mdx",
  // do something about templates
]);
console.log(files);
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const files = await glob(
    [
      "./blog/**.mdx",
      "./docs/**/*.mdx",
      "./careers/**.mdx",
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
      .replace("/index", "");
    const metadataRoute = {
      url: `https://thenile.dev/${path}`,
      lastModified: file.mtime ? new Date(file.mtime) : new Date(),
      changeFrequency: "daily" as "daily",
      priority: 0.7,
    };
    pages.push(metadataRoute);
  }
  return [
    ...pages,
    {
      url: "https://thenile.dev/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://thenile.dev/about-us",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://thenile.dev/community",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://thenile.dev/pricing",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://thenile.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://thenile.dev/docs",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://thenile.dev/templates",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
