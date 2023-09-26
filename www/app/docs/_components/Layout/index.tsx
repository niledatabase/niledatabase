export const Col = ({ children }: { children: JSX.Element }) => {
  return <div className="flex flex-col flex-1 gap-2 not-prose">{children}</div>;
};

export const Row = ({ children }: { children: JSX.Element }) => {
  return <div className="flex flex-row flex-1 gap-2 not-prose">{children}</div>;
};
