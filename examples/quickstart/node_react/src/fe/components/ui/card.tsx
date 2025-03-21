export function Card({ children }: { children: JSX.Element }) {
  return (
    <div className="p-4 hover:shadow-lg hover:border-gray-700 border border-gray-600 rounded-lg w-60 transition-all">
      {children}
    </div>
  );
}
