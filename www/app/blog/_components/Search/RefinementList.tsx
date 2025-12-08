export function RefinementList({ items }: { items: string[] }) {
  const sortedItems = items.sort();
  return (
    <div className="server-side-refinements h-[52px] w-full">
      <div className="relative z-10 -mt-5 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-screen flex-row items-center gap-6 overflow-y-scroll lg:max-w-[1000px]">
          {sortedItems.map((item: string) => (
            <button
              className={`whitespace-nowrap rounded-xl border border-gray bg-gradient-white bg-clip-text px-4 py-3 text-[16px] leading-[20px] text-transparent hover:border-lightGray`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
