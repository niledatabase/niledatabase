import { useCallback, useState } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};
export default function BgHoverer(props: Props) {
  const [bgPosition, setBgPosition] = useState("50% 50%");
  const [active, setActive] = useState(false);

  const { children } = props;
  const handleMouseMove = useCallback(
    (e: { nativeEvent: { offsetX: any; offsetY: any; target: any } }) => {
      if (active) {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const width = target?.offsetWidth;
        const height = target?.offsetHeight;

        const xPos = (offsetX / width) * 100;
        const yPos = (offsetY / height) * 100;

        setBgPosition(`${xPos}% ${yPos}%`);
      }
    },
    [active]
  );

  return (
    <div
      className="bg-hover border w-full"
      style={{
        background: active
          ? `radial-gradient(circle at ${bgPosition}, #f4c5872e 0.12%, #d6d3e938 2.04%, transparent 5.97%)`
          : "",
        transition: "background 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setActive(false);
      }}
      onMouseEnter={() => {
        setActive(true);
      }}
    >
      <div style={{ pointerEvents: active ? "none" : "all" }}>{children}</div>
    </div>
  );
}
