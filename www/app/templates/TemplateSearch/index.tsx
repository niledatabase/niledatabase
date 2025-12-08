'use client';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Template } from '../types';
import TemplateCard from './TemplateCard';
import GradientButton from '@/app/_components/common/GradientButton';

import Search from '@/public/icons/search.svg';
import Plus from '@/public/icons/plus.svg';

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
  const [searchText, setSearchText] = useState('');

  const filtered = useMemo(() => {
    if (!searchText) {
      return templates;
    }
    const _templates = templates.filter((template) => {
      const keys = Object.keys(template);
      const anyMatches = keys
        .map((key) => {
          if (key === 'metadata') {
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
    <div className="templateSearch flex w-full flex-col gap-[24px]">
      {searchEnabled && (
        <div className="relative z-10 -mt-16 flex w-full flex-1 flex-row gap-2 px-6 md:px-24 lg:px-8">
          <Image
            alt="looking glass"
            src={Search}
            width={24}
            height={24}
            data-image-zoom-disabled
          />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search all templates"
            className="w-full border-none bg-transparent text-lg leading-10 placeholder:opacity-40 focus:outline-none"
          />
        </div>
      )}
      {showButton && (
        <div className="self-end">
          <GradientButton href="/templates" variant="soft">
            <Image
              src={Plus}
              alt="orange plus sign"
              width={24}
              height={24}
              data-image-zoom-disabled
            />
            <span className="bg-gradient-white bg-clip-text pl-2 text-[16px] text-transparent subpixel-antialiased">
              Add Your Template
            </span>
          </GradientButton>
        </div>
      )}
      <div className="mt-[20px] flex w-screen flex-row flex-wrap justify-center overflow-hidden overflow-x-scroll md:w-auto">
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
