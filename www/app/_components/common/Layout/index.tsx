type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function Col({ children, className = '' }: LayoutProps) {
  return (
    <div
      className={`not-prose flex w-full flex-1 flex-col justify-between gap-2 ${className}`}
    >
      {children}
    </div>
  );
}

export function Row({ children, className = '' }: LayoutProps) {
  return (
    <div className="mb-2 flex w-full">
      <div
        className={`not-prose flex w-full flex-1 flex-col justify-between gap-4 md:flex-row ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default {
  Col,
  Row,
};
