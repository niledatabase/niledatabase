import React from "react";
import Database from "@/public/icons/database.svg";
import Store from "@/public/icons/store.svg";
import Support from "@/public/icons/support.svg";
import Image from "next/image";
export function DatabaseRow() {
  return (
    <div className="text-lg lg:text-sm xl:text-lg mb-3.5 flex flex-row gap-2 items-center">
      <div className="icon rounded-xl flex justify-center !w-11 !h-11">
        <Image
          src={Database}
          alt="orange, purple, blue db icon"
          width={28}
          height={28}
        />
      </div>
      Databases
    </div>
  );
}
export function ConsoleRow() {
  return (
    <div className="text-lg lg:text-sm xl:text-lg mb-3.5 flex flex-row gap-2 items-center">
      <div className="icon rounded-xl flex justify-center !w-11 !h-11">
        <Image src={Store} alt="</> inside []" width={28} height={28} />
      </div>
      Management Console
    </div>
  );
}
export function SupportRow() {
  return (
    <div className="text-lg lg:text-sm xl:text-lg mb-3.5 flex flex-row gap-2 items-center">
      <div className="icon rounded-xl flex justify-center !w-11 !h-11">
        <Image
          src={Support}
          alt="circle with question mark"
          width={28}
          height={28}
        />
      </div>
      Support
    </div>
  );
}

export function TableDivider({
  mobile,
  children,
}: {
  mobile: "database" | "console" | "support";
  children: JSX.Element;
}) {
  return (
    <>
      {mobile === "database" ? (
        <div className="lg:hidden py-5">
          <DatabaseRow />
        </div>
      ) : null}
      {mobile === "console" ? (
        <div className="lg:hidden py-5">
          <ConsoleRow />
        </div>
      ) : null}
      {mobile === "support" ? (
        <div className="lg:hidden py-5">
          <SupportRow />
        </div>
      ) : null}

      {children}
    </>
  );
}
