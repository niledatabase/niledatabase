import React from "react";
export default function TokenCost({ header }: { header: string }) {
  return (
    <div className="flex flex-col justify-center items-start 2xl:px-24">
      <div className="text-[16px] leading-[44px] border-b-2 border-b-zinc-700 w-full">
        {header}
      </div>
      <div className="w-full py-4 border-b border-b-zinc-700">
        <div className="flex flex-row justify-between w-full gap-8 items-center">
          <div className="opacity-70 w-2/3">Query</div>
          <div className="opacity-70 flex flex-row w-1/3">
            <div className="flex flex-col w-1/2">
              <div>Avg query tokens</div>
              <div>for one million queries</div>
            </div>
            <div className="flex flex-col w-1/2">
              <div>
                Price for one million
                <div></div>
                queries
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableRow({
  col1,
  col2,
  col3,
}: {
  col1: string;
  col2: string;
  col3: string;
}) {
  return (
    <div className="2xl:px-24">
      <div className="w-full py-4 border-b border-b-zinc-700 flex flex-row gap-8">
        <div className="w-2/3">{col1}</div>
        <div className="flex flex-row w-1/3">
          <div className="w-1/2">{col2}</div>
          <div className="w-1/2">{col3}</div>
        </div>
      </div>
    </div>
  );
}
