import { MDXProps } from "mdx/types";
import IdLink, { HoverManager } from "./IdLink";

type Props = {
  toc: any;
};
export default function TableOfContents(props: Props) {
  const { toc } = props;

  if (toc.length <= 1) {
    return null;
  }
  return (
    <div className="sticky top-0 h-full pt-20 hidden 2xl:block">
      <div className="relative">
        <div className="absolute top-0 bottom-0 w-[1px] bg-divider h-full -left-[1px]"></div>
        <div className="pl-8">
          <div className="text-[16px]">On this page</div>
          <ol className="flex flex-col mt-2">
            <HoverManager items={toc} />
          </ol>
        </div>
      </div>
    </div>
  );
}
