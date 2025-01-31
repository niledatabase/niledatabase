type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function Col({ children, className = "" }: LayoutProps) {
  return (
    <div className={`flex flex-col flex-1 gap-2 not-prose justify-between w-full ${className}`}>
      {children}
    </div>
  );
}

export function Row({ children, className = "" }: LayoutProps) {
  return (
    <div className="mb-2 flex w-full">
      <div className={`flex flex-col md:flex-row flex-1 gap-4 not-prose justify-between w-full ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default {
  Col,
  Row,
}; 