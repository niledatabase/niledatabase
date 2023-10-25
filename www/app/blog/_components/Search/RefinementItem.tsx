"use client";
import { useCallback, useState } from "react";

export function RefinementItem({
  item,
  refine,
}: {
  item: any;
  refine: (value: string) => void;
}) {
  const [selected, setSelected] = useState<"selected" | "normal">("normal");

  const borderColors = {
    selected: "border-lightGray",
    normal: "border-gray text-transparent",
  };
  const onClick = useCallback(() => {
    if (selected !== "selected") {
      setSelected("selected");
    } else {
      setSelected("normal");
    }
    refine(item.value);
  }, [selected]);

  return (
    <button
      onClick={onClick}
      className={`border ${borderColors[selected]} hover:border-lightGray rounded-xl px-4 py-3 text-[16px] leading-[20px] bg-gradient-white bg-clip-text whitespace-nowrap`}
    >
      {item.label}
    </button>
  );
}
