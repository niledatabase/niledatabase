"use client";
import { useEffect, useState } from "react";
import Heading from "../_components/common/Heading";
import useGoToHash from "../_components/common/useGoToHash";

export default function CareerHeader() {
  const [forceVisible, setForceVisible] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setForceVisible(window.location.hash === "#careers");
    }
  }, []);
  const ref = useGoToHash({ offset: -76 });
  return (
    <>
      <a href="#careers" ref={ref}></a>
      <div className="mt-20">
        <Heading text="Careers" forceVisible={forceVisible} />
      </div>
    </>
  );
}
