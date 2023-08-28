"use client";
import { Remark } from "react-remark";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
export default function Markdown({ contents }: { contents: string }) {
  return (
    <Remark
      remarkToRehypeOptions={{ allowDangerousHtml: true }}
      //@ts-expect-error - what is this
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
    >
      {contents}
    </Remark>
  );
}
