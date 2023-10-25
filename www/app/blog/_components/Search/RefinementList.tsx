export function RefinementList({ items }: { items: string[] }) {
  const sortedItems = items.sort();
  return (
    <div className="w-full h-[52px] server-side-refinements">
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between -mt-5 z-10 relative">
        <div className="flex flex-row items-center gap-6 overflow-y-scroll lg:max-w-[1000px] w-screen">
          {sortedItems.map((item: string) => (
            <button
              className={`border border-gray text-transparent hover:border-lightGray rounded-xl px-4 py-3 text-[16px] leading-[20px] bg-gradient-white bg-clip-text whitespace-nowrap`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
