import React, { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="w-60 rounded-lg border border-gray-600 p-4 transition-all hover:border-gray-700 hover:shadow-lg">
      {children}
    </div>
  );
}
