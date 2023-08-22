"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Template } from "../types";
import TemplateCard from "./TemplateCard";

const Empty = () => {
  return <div>No templates match your criteria :feels_bad_man:</div>;
};
export default function TemplateSearch({
  templates,
}: {
  templates: Template[];
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
    <>
      <div className="flex flex-row gap-2 flex-1 w-full -mt-8 relative z-10 px-4">
        <Image
          src="/icons/search.svg"
          alt="looking glass"
          width={32}
          height={32}
        />
        <input
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search all templates"
          className="bg-transparent text-lg border-none w-full leading-10 focus:outline-none"
        />
      </div>
      <div className="flex flex-row gap-6 flex-wrap justify-center">
        {!filtered.length ? (
          <Empty />
        ) : (
          filtered.map((template, idx) => {
            return (
              <TemplateCard {...template} key={`${template.name}-${idx}`} />
            );
          })
        )}
      </div>
    </>
  );
}
