import { glob } from "glob";
import { parseMetadata } from "../_components/parseMetadata";
import fs from "node:fs";

function stripToPlainText(content: string): string {
  // Remove frontmatter
  content = content.replace(/^---[\s\S]*?---/g, "");

  // Remove all imports and exports including metadata
  content = content.replace(/^import\s+.*?;?\s*$/gm, "");
  content = content.replace(/^export\s+.*?{[\s\S]*?}\s*;?/gm, "");

  // Convert markdown to HTML
  content = content
    .replace(/```[\s\S]*?```/g, (match) => `<pre><code>${match.slice(3, -3)}</code></pre>`) // code blocks
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />') // images
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>') // links
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>') // bold
    .replace(/_([^_]+)_/g, '<i>$1</i>') // italic
    .replace(/`([^`]+)`/g, '<code>$1</code>') // inline code
    .replace(/^>\s*(.*)/gm, '<blockquote>$1</blockquote>') // blockquotes
    .replace(/^[-*+]\s+(.*)$/gm, '<li>$1</li>') // unordered list items
    .replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>') // ordered list items
    .replace(/^#{1,6}\s+(.*)/gm, '<p><b>$1</b></p>') // headers to bold paragraphs
    .replace(/<\/li>\n<li>/g, '</li><li>') // clean up list items
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>'); // wrap lists

  // Split into paragraphs and wrap with <p> tags
  const paragraphs = content
    .split("\n\n")
    .map((para) => para.trim())
    .filter((para) => para)
    .map((para) => {
      if (para.startsWith("<")) return para; // Already HTML
      return `<p>${para}</p>`;
    })
    .join("\n");

  return paragraphs.replace(/\n+/g, "\n").trim();
}

function extractSummary(content: string, sizzle: string): string {
  if (sizzle) return sizzle;

  const firstSentence = content.split(/[.!?](?:\s|$)/)[0].trim();
  return firstSentence || content.slice(0, 150).trim();
}

export async function GET() {
  const files = await glob("app/blog/**.mdx");
  files.sort().reverse();

  const latestFile = files[0];
  const latestContent = fs.readFileSync(latestFile, "utf-8");
  const { publishDate: latestDate } = parseMetadata(latestFile, latestContent);

  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>Blog — Nile Database</title>
      <subtitle>Posts about the Nile Database platform, PostgreSQL, databases, and more.</subtitle>
      <link href="https://www.thenile.dev" />
      <link rel="alternate" type="text/html" hreflang="en" href="https://www.thenile.dev/blog" />
      <link rel="self" type="application/atom+xml" href="https://www.thenile.dev/blog/feed.atom" />
      <id>https://www.thenile.dev/blog/feed.atom</id>
      <updated>${new Date(
        latestDate
      ).toISOString()}</updated>${await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(file, "utf-8");
      const { metadata } = await import(`../${file.split("/").pop()}`);
      const { publishDate, slug } = parseMetadata(file, content);

      const plainText = stripToPlainText(content);
      const summary = extractSummary(plainText, metadata.sizzle);
      const entryId = `https://www.thenile.dev/blog/${slug}`;
      const timestamp = new Date(publishDate).toISOString();

      // Generate tags if they exist in metadata
      const tagsXml = metadata.tags
        ? metadata.tags
            .map((tag: string) => `        <category term="${tag}" />`)
            .join("\n")
        : "";

      return `
      <entry>
        <title>${metadata.title}</title>
        <link href="${entryId}" />
        <id>${entryId}</id>
        <published>${timestamp}</published>
        <updated>${timestamp}</updated>${tagsXml ? "\n" + tagsXml : ""}
        <content type="xhtml">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${stripToPlainText(content)}
            <p class="more">
              <a href="${entryId}">Read more</a>
            </p>
          </div>
        </content>
        <summary><![CDATA[${summary}]]></summary>
        ${metadata.authors
          .map((author: string) => `<author><name>${author}</name></author>`)
          .join("\n")}
      </entry>`;
    })
  ).then((entries) => entries.join(""))}
    </feed>`;

  return new Response(atomXml, {
    headers: {
      "Content-Type": "application/atom+xml;charset=utf-8",
    },
  });
}
