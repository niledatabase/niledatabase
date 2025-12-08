'use client';
import { useCallback, useRef, useState } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};
export default function BgHoverer(props: Props) {
  const { children } = props;
  const [bgPosition, setBgPosition] = useState('50% 50%');
  const [active, setActive] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Event handler to update position based on mouse movement within the div
  const handleMouseMove = useCallback(
    (event: { clientX: any; clientY: any }) => {
      const container = containerRef.current;
      if (container != null) {
        const { left, top } = container.getBoundingClientRect();
        const { clientX, clientY } = event;

        // Calculate position relative to the container
        setPosition({
          x: clientX - left - 90, // Center the 180px box
          y: clientY - top - 90, // Center the 180px box
        });
      }
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="bg-hover relative flex h-full w-full overflow-hidden"
      style={{
        transition: 'background 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setActive(false);
      }}
      onMouseEnter={() => {
        setActive(true);
      }}
    >
      <div
        className="translate-z-0 pointer-events-none absolute h-[180px] w-[180px] rounded-full bg-white bg-90 opacity-20 blur-[25px] will-change-transform"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: 'opacity 200ms',
          opacity: !active ? 0 : 0.2,
        }}
      ></div>
      <div
        className="flex flex-1 flex-col"
        style={{ pointerEvents: active ? 'none' : 'all' }}
      >
        {children}
      </div>
    </div>
  );
}
