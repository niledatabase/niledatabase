"use client";
import Image from "next/image";
import algoliasearch from "algoliasearch/lite";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  InstantSearch,
  useHits,
  useRefinementList,
  useSearchBox,
} from "react-instantsearch";
import Link from "next/link";
import { Authors } from "../Authors";
import { Metadata } from "../Metadata";
import Coffee from "@/public/blog/coffee.webp";
import SearchIcon from "@/public/icons/search.svg";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;

const searchClient = ALGOLIA_APP_ID && ALGOLIA_API_KEY ? algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY
) : null;

function RefinementItem({
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

function RefinementList() {
  const { items, refine } = useRefinementList({ attribute: "tags" });
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.value.localeCompare(b.value, "en")),
    [items]
  );
  useEffect(() => {
    if (items.length && typeof document !== "undefined") {
      const serverSide = document.querySelector(".server-side-refinements");
      serverSide?.setAttribute("style", "display:none");
    }
  }, [items.length]);
  return (
    <div className="flex flex-row items-center gap-6 overflow-y-scroll lg:max-w-[1000px] w-screen min-h-[42px]">
      {sortedItems.map((item) => (
        <RefinementItem key={item.label} item={item} refine={refine} />
      ))}
    </div>
  );
}

function Hit({ hit }: any) {
  console.log(hit.objectID, "what is this?");
  const [, publishDate] = /.+(\d{4}-\d{2}-\d{2}).+/.exec(hit.objectID) ?? [];
  const cleaned = hit.objectID.replace(/\d{4}-\d{2}-\d{2}-/, "");
  const slug = cleaned.replace(".mdx", "");
  return (
    <div className="w-full md:w-1/2 lg:w-1/3">
      <div className="p-4">
        <Link href={`/blog/${slug}`}>
          <div className="bg-[#2D2D2D] rounded-xl overflow-hidden flex-shrink-0 mb-4 items-center justify-center flex aspect-video w-full">
            {hit?.image ? (
              <Image
                className="aspect-video w-full"
                priority
                alt={hit.image}
                width={416}
                height={242}
                src={`/blog/${hit.image}`}
              />
            ) : (
              <Image
                alt="coffee"
                className="aspect-video w-full"
                width={416}
                height={216}
                src={Coffee}
              />
            )}
          </div>
          <Metadata
            publishDate={publishDate}
            readLength={hit?.readLength}
            title={hit?.title}
            sizzle={hit?.sizzle}
          />
          <Authors authors={hit?.authors} />
        </Link>
      </div>
    </div>
  );
}

function SearchBox() {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    refine(inputValue);
  }, [inputValue]);

  return (
    <div className="flex flex-row gap-2 flex-1 w-full -mt-16 relative z-10 lg:px-8 md:px-24 px-6">
      <Image
        alt="looking glass"
        src={SearchIcon}
        width={24}
        height={24}
        data-image-zoom-disabled
      />
      <input
        className="bg-transparent text-lg border-none w-full leading-10 focus:outline-none placeholder:opacity-40"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search all articles"
        spellCheck={false}
        maxLength={512}
        type="search"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.currentTarget.value);
        }}
      />
    </div>
  );
}

function Hits() {
  const { hits } = useHits();
  const { query } = useSearchBox();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const serverSide = document.querySelector(".server-side-hits");
      if (query) {
        serverSide?.setAttribute("style", "display:none");
      } else {
        serverSide?.setAttribute("style", "display:flex");
      }
    }
  }, [query]);

  if (!query) {
    return;
  }

  return (
    <div className="flex flex-row flex-wrap justify-start">
      {!hits.length && (
        <div className="text-4xl">No blogs match your criteria.</div>
      )}
      {hits.map((hit) => {
        return <Hit hit={hit} key={hit.objectID} />;
      })}
    </div>
  );
}

export default function Search() {
  if (!searchClient) {
    return null;
  }

  return (
    <div className="templateSearch flex flex-col gap-[24px] w-full">
      <InstantSearch searchClient={searchClient} indexName="blog">
        <SearchBox />
        <Hits />
      </InstantSearch>
    </div>
  );
}
