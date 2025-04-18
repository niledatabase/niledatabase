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
      </div>
      <div className="text-2xl my-4">{title}</div>
      <div className="line-clamp-2 overflow-hidden text-ellipsis opacity-60 mb-4 text-base leading-normal">
        {sizzle}
      </div>
    </>
  );
}
