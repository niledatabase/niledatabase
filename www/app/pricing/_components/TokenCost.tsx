import React from 'react';
export default function TokenCost({ header }: { header: string }) {
  return (
    <div className="flex flex-col items-start justify-center 2xl:px-24">
      <div className="w-full border-b-2 border-b-zinc-700 text-[16px] leading-[44px]">
        {header}
      </div>
      <div className="w-full border-b border-b-zinc-700 py-4">
        <div className="flex w-full flex-row items-center justify-between gap-8">
          <div className="w-2/3 opacity-70">Query</div>
          <div className="flex w-1/3 flex-row opacity-70">
            <div className="flex w-1/2 flex-col">
              <div>Avg query tokens</div>
              <div>for one million queries</div>
            </div>
            <div className="flex w-1/2 flex-col">
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
      <div className="flex w-full flex-row gap-8 border-b border-b-zinc-700 py-4">
        <div className="w-2/3">{col1}</div>
        <div className="flex w-1/3 flex-row">
          <div className="w-1/2">{col2}</div>
          <div className="w-1/2">{col3}</div>
        </div>
      </div>
    </div>
  );
}
