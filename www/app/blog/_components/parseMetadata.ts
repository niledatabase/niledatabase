export const parseMetadata = (fileName: string, content: any) => {
  const [, publishDate] = /.+(\d{4}-\d{2}-\d{2}).+/.exec(fileName) ?? [];
  const [file] = fileName.split("/").reverse();
  const cleaned = file.replace(/\d{4}-\d{2}-\d{2}-/, "");
  const slug = cleaned.replace(".mdx", "");
  const readLength = Math.floor(content.toString().length / 238);
  return {
    publishDate,
    slug,
    readLength,
  };
};
