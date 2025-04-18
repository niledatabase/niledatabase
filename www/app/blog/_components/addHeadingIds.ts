export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getHeadings(
  content: string
): { text: string; level: number }[] {
  const headingRegex = /^(##)\s+(.+)$/gm;
  const headings: { text: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    headings.push({ text, level: 2 }); // Always level 2 since we only match ##
  }

  return headings;
}
