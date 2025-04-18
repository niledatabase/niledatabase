export function Metadata({
  publishDate,
  readLength,
  title,
  sizzle,
}: {
  publishDate: string;
  readLength: number;
  title: string;
  sizzle: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center gap-3">
        <div className="opacity-60">{publishDate}</div>
        <div className="opacity-[.43] text-[10px]">●</div>
        <div className="opacity-60">{readLength} min read</div>
      </div>
      <div className="text-3xl my-4">{title}</div>
      <div className="line-clamp-2 overflow-hidden text-ellipsis opacity-60 mb-4 text-base leading-normal">
        {sizzle}
      </div>
    </>
  );
}
