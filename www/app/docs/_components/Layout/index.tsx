export const Col = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="flex flex-col flex-1 gap-2 not-prose justify-between w-full">
      {children}
    </div>
  );
};

export const Row = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="mb-2 flex w-full">
      <div className="flex flex-col md:flex-row flex-1 gap-4 not-prose justify-between w-full">
        {children}
      </div>
    </div>
  );
};
