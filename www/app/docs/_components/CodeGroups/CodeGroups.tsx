"use client";
import { isObject } from "lodash";
import { Children, ReactNode, useState } from "react";

type Props = {
  title: string;
  method: "POST" | "GET" | "DELETE" | "PUT";
  pathname: string;
  children: JSX.Element[];
};
const variants = {
  base: "hidden",
  active: "show max-w-[500px] overflow-scroll",
};
const tabsVariants = {
  base: "cursor-pointer py-2 px-3 opacity-60 hover:opacity-100",
  active: "cursor-pointer py-2 px-3 opacity-100 border-b border-orange",
};
const convertName = (name: string) => {
  const [, language] = name?.match(/language-(.+)/) ?? [];
  return language;
};
export default function CodeGroups(props: Props) {
  const [active, setActive] = useState();
  const { title, method, pathname, children } = props;
  const items: ReactNode[] = Children.toArray(children);

  return (
    <div className="border border-gray rounded-[12px] overflow-hidden">
      <div className="bg-black p-4 flex-row flex justify-between">
        {title}
        <div>
          {items.map((child) => {
            if (isObject(child) && "props" in child) {
              const { className } = child.props.children.props;
              const tab = convertName(className);
              return (
                <span
                  className={
                    active === className
                      ? tabsVariants.active
                      : tabsVariants.base
                  }
                  onClick={() => setActive(className)}
                  key={className}
                >
                  {tab}
                </span>
              );
            }
          })}
        </div>
      </div>
      {method && (
        <div className="px-4 py-2 flex flex-row items-middle gap-2 border-b border-lightGray">
          <span className="bg-gradient-text bg-clip-text text-transparent">
            {method}
          </span>
          - <span className="text-sm flex items-center">{pathname}</span>
        </div>
      )}

      <div className="relative">
        {items.map((child, idx) => {
          if (isObject(child) && "props" in child) {
            const { className } = child?.props.children.props;
            if (!active && idx === 0) {
              setActive(className);
            }

            return (
              <div
                key={className}
                className={
                  active === className ? variants.active : variants.base
                }
              >
                {child}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
