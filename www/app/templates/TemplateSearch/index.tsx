"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Template } from "../types";
import TemplateCard from "./TemplateCard";
import GradientButton from "@/app/_components/common/GradientButton";

import Search from "@/public/icons/search.svg";
import Plus from "@/public/icons/plus.svg";

const Empty = () => {
  return <div>No templates match your criteria.</div>;
};
export default function TemplateSearch({
  templates,
  searchEnabled = true,
  showButton = false,
  limit,
}: {
  templates: Template[];
  searchEnabled?: boolean;
  showButton?: boolean;
  limit?: number;
}) {
  const [searchText, setSearchText] = useState("");

  const filtered = useMemo(() => {
    if (!searchText) {
      return templates;
    }
    const _templates = templates.filter((template) => {
      const keys = Object.keys(template);
      const anyMatches = keys
        .map((key) => {
          if (key === "metadata") {
            for (const mKey of Object.keys(template.metadata)) {
              if (template[key][mKey].includes(searchText)) {
                return true;
              }
            }
          } else {
            return (template as any)[key].includes(searchText);
          }
        })
        .filter(Boolean);
      return anyMatches.length > 0;
    });
    return _templates;
  }, [searchText]);

  return (
    <div className="templateSearch flex flex-col gap-[24px] w-full">
      {searchEnabled && (
        <div className="flex flex-row gap-2 flex-1 w-full -mt-16 relative z-10 lg:px-8 md:px-24 px-6">
          <Image alt="looking glass" src={Search} width={24} height={24} />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search all templates"
            className="bg-transparent text-lg border-none w-full leading-10 focus:outline-none placeholder:opacity-40"
          />
        </div>
      )}
      {showButton && (
        <div className="self-end">
          <GradientButton href="/templates" variant="soft">
            <Image src={Plus} alt="orange plus sign" width={24} height={24} />
            <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
              Add Your Template
            </span>
          </GradientButton>
        </div>
      )}
      <div className="flex flex-row flex-wrap justify-center mt-[20px] overflow-hidden overflow-x-scroll w-screen md:w-auto">
        {!filtered.length ? (
          <Empty />
        ) : (
          filtered.slice(0, limit).map((template, idx) => {
            return (
              <TemplateCard {...template} key={`${template.name}-${idx}`} />
            );
          })
        )}
      </div>
    </div>
  );
}
