import React, { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="p-4 hover:shadow-lg hover:border-gray-700 border border-gray-600 rounded-lg w-60 transition-all">
      {children}
    </div>
  );
}
