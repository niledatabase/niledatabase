import { glob } from "glob";
import { parseMetadata } from "../_components/parseMetadata";
import fs from "node:fs";

function stripToPlainText(content: string): string {
  // Remove frontmatter
  content = content.replace(/^---[\s\S]*?---/g, '');
  
  // Remove all imports and exports including metadata
  content = content.replace(/^import\s+.*?;?\s*$/gm, '');
  content = content.replace(/^export\s+.*?{[\s\S]*?}\s*;?/gm, '');
  
  // Remove all markdown and formatting
  content = content
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // links
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // bold/italic
    .replace(/`[^`]+`/g, '$1') // inline code
    .replace(/^>\s*(.*)/gm, '$1') // blockquotes
    .replace(/^[-*+]\s+/gm, '') // list markers
    .replace(/^\d+\.\s+/gm, '') // numbered lists
    .replace(/^#{1,6}\s+(.*)/gm, '$1') // headers
    .replace(/<[^>]+>/g, '') // HTML tags
    .replace(/\{[^}]+\}/g, ''); // JSX expressions

  // Convert to single block of text
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
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
      <updated>${new Date(latestDate).toISOString()}</updated>

${await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(file, "utf-8");
      const { metadata } = await import(`../${file.split("/").pop()}`);
      const { publishDate, slug } = parseMetadata(file, content);
      
      const plainText = stripToPlainText(content);
      const summary = extractSummary(plainText, metadata.sizzle);
      const entryId = `https://www.thenile.dev/blog/${slug}`;
      const timestamp = new Date(publishDate).toISOString();

      // Generate tags if they exist in metadata
      const tagsXml = metadata.tags ? metadata.tags.map((tag: string) => `        <category term="${tag}" />`).join('\n') : '';

      return `  
      <entry>
        <title>${metadata.title}</title>
        <link href="${entryId}" />
        <id>${entryId}</id>
        <published>${timestamp}</published>
        <updated>${timestamp}</updated>
${tagsXml}
        <content><![CDATA[${plainText}]]></content>
        <summary><![CDATA[${summary}]]></summary>
        ${metadata.authors.map((author: string) => `<author><name>${author}</name></author>`).join("\n")}
      </entry>
    `;
    })
  ).then((entries) => entries.join("\n"))}
    </feed>`;

  return new Response(atomXml, {
    headers: {
      "Content-Type": "application/atom+xml;charset=utf-8",
    },
  });
} 