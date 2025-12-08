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
      <div className="my-4 text-2xl">{title}</div>
      <div className="mb-4 line-clamp-2 overflow-hidden text-ellipsis text-base leading-normal opacity-60">
        {sizzle}
      </div>
    </>
  );
}
