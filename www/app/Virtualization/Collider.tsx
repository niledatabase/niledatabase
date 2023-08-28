import useIntersection from "@/common/useIntersection";
import { useEffect, useRef } from "react";
export type ColliderProps = {
  onVisible?: () => void;
  onInvisible?: () => void;
  children?: JSX.Element | JSX.Element[];
  className?: string;
  rootMargin?: string;
};
export function Collider(props: ColliderProps) {
  const { onVisible, onInvisible, children, className, rootMargin } = props;
  const wrapperRef = useRef(null);
  const isVisible = useIntersection(wrapperRef, {
    rootMargin,
  });
  useEffect(() => {
    if (isVisible) {
      onVisible && onVisible();
    } else {
      onInvisible && onInvisible();
    }
  }, [isVisible]);
  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
