export default function Cards({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <div className="flex flex-row gap-4">{children}</div>;
}
