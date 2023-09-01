"use client";
import useSlowScroll from "@/app/_components/Virtualization/useSlowScroll";
import useIntersection from "@/app/_components/common/useIntersection";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
type Props = {
  id: string;
  children: string;
  active: boolean;
  tryToSetActive: (order: number, id: string) => void;
  order: number;
  setForceActive: (id: number) => void;
  forceActive: number | null;
};

export default function IdLink(props: Props) {
  const {
    id,
    children,
    active,
    tryToSetActive,
    order,
    setForceActive,
    forceActive,
  } = props;
  const linkRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    linkRef.current = document.getElementById(id);
  }, []);
  const isVisible = useIntersection(linkRef, {
    rootMargin: "-10% 0px -60% 0px",
  });
  useEffect(() => {
    if (isVisible) {
      tryToSetActive(order, id);
    }
    if (order === 0 && !isVisible) {
      tryToSetActive(1, id);
    }
  }, [isVisible]);

  return (
    <Link
      className={`block ${
        active || forceActive === order ? "opacity-100" : "opacity-60"
      } p-2 ml-1 hover:opacity-100 transition-opacity`}
      href={`#${id}`}
      onClick={() => {
        setForceActive(order);
      }}
    >
      {order === 0 ? null : children}
    </Link>
  );
}

export const HoverManager = ({
  items,
}: {
  items: { id: string; children: string }[];
}) => {
  const defaultActive = items.findIndex(
    (item) =>
      typeof window !== "undefined" && window.location.hash.includes(item.id)
  );
  const [active, setActive] = useState<number>(defaultActive ?? -1);
  const [forceActive, setForceActive] = useState<number | null>(null);
  const handleSetActive = useCallback(
    (order: number, id: string) => {
      if (!forceActive) {
        if (order >= active) {
          setActive(active + 1);
        } else {
          setActive(active - 1);
        }
      } else if (order === -1) {
        setActive(order);
      }
    },
    [active, forceActive, defaultActive]
  );
  useEffect(() => {
    setActive(defaultActive);
  }, [defaultActive]);

  useSlowScroll(1, (pos: number) => {
    if (forceActive !== null) {
      setActive(forceActive);
      setForceActive(null);
    }
    if (pos < 20 && active !== 0) {
      setActive(0);
    }
  });
  return items.map((item, idx) => {
    return (
      <li key={item.id}>
        <IdLink
          active={
            typeof document !== "undefined" &&
            document.documentElement.scrollTop !== 0 &&
            active === idx
          }
          {...item}
          tryToSetActive={handleSetActive}
          forceActive={forceActive}
          order={idx}
          setForceActive={(id) => {
            setActive(id);
          }}
        />
      </li>
    );
  });
};
