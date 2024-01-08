"use client";
import { useEffect, useState } from "react";
import Heading from "../_components/common/Heading";
import useGoToHash from "../_components/common/useGoToHash";

export default function CareerHeader() {
  const ref = useGoToHash({ offset: -76, hash: "#careers" });
  return (
    <>
      <a href="#careers" ref={ref}></a>
      <div className="mt-20">
        <Heading text="Open positions" />
      </div>
    </>
  );
}
