"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import algoliasearch from "algoliasearch";
import { InstantSearch, useHits, useSearchBox } from "react-instantsearch";
import Link from "next/link";
import SearchIcon from "@/public/icons/search.svg";
import Arrow from "@/public/icons/arrow.svg";

const KEY = "NILE_DOCS_HISTORY";

const addItem = (item: any) => {
  const storage = getStorage();
  if (storage) {
    const index = storage.findIndex(
      (existing: any) => existing.objectID === item.objectID
    );
    if (index !== -1) {
      storage.splice(index + 1, 0, storage.splice(index, 1)[0]);
    } else {
      storage.unshift(item);
    }
    if (storage.length > 20) {
      storage.pop();
    }
    localStorage.setItem(KEY, JSON.stringify(storage));
  } else {
    localStorage.setItem(KEY, JSON.stringify([item]));
  }
};

const getStorage = () => {
  const storage = localStorage.getItem(KEY);
  if (storage) {
    return JSON.parse(storage);
  }
  return [];
};

const searchClient = algoliasearch(
  String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID),
  String(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY)
);

function Portal({ children }: { children: any }) {
  return createPortal(children, document.body);
}

export default function Search() {
  const [showHits, setShowHits] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const scrollerRef = useRef<(event: KeyboardEvent) => void>(() => null);

  const escListener = useCallback((event: KeyboardEvent) => {
    if (event.metaKey && event.key === "k") {
      setShowSearch(true);
    }
    if (event.key === "Escape") {
      setShowSearch(false);
    }
  }, []);

  useEffect(() => {
    document.removeEventListener("keydown", scrollerRef.current);
    scrollerRef.current = escListener;
    document.addEventListener("keydown", scrollerRef.current, {
      passive: false,
    });
    () => {
      document.removeEventListener("keydown", scrollerRef.current);
    };
  }, [escListener]);
  return (
    <>
      <div
        className={`flex flex-row z-10 border border-[#242627] bg-black rounded-[12px] mt-4 items-center mr-2 hover:bg-lightGray cursor-pointer`}
        onClick={() => {
          setShowSearch(true);
        }}
      >
        <Image
          className="pl-2"
          alt="looking glass"
          src={SearchIcon}
          width={32}
          height={32}
        />
        <button
          className={`bg-transparent w-full border-none text-lg leading-10 focus:outline-none py-[1px] px-[20px] text-left`}
          spellCheck={false}
        >
          <span className="opacity-80">Search</span>
        </button>
        <div className="bg-lightGray rounded-[8px] p-1.5 mr-1">
          <span className="opacity-80"> ⌘K</span>
        </div>
      </div>
      {showSearch && (
        <InstantSearch searchClient={searchClient} indexName="docs">
          {/* @ts-expect-error Portal is actually valid here */}
          <Portal>
            <div
              className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md p-[12vh] z-50 bg-[#0e0e0e1f]"
              onClick={() => {
                setShowSearch(false);
              }}
            >
              <SearchBox
                setShowHits={setShowHits}
                showHits={showHits}
                setShowSearch={setShowSearch}
              />
              {showHits ? (
                <div className="relative bg-black h-[50rem] overflow-y-scroll rounded-b-[12px] border border-[#242627] border-t-0">
                  <div className="flex flex-col gap-3 justify-start absolute bg-black h-fit w-full z-20 p-10">
                    <Hits />
                  </div>
                </div>
              ) : (
                <div className="relative bg-black h-[50rem] overflow-y-scroll rounded-b-[12px] border border-[#242627] border-t-0">
                  <div className="flex flex-col gap-3 justify-start absolute bg-black h-fit w-full z-20 p-10">
                    <div className="text-lg">Recent searches</div>
                    <HistoryItems />
                  </div>
                </div>
              )}
            </div>
          </Portal>
        </InstantSearch>
      )}
    </>
  );
}

function HistoryItems() {
  const items = getStorage();
  return items.map((hit: any, idx: number) => {
    return <Hit key={idx} hit={hit} allowHighlight={false} />;
  });
}
function SearchBox({
  setShowHits,
  showHits,
  setShowSearch,
}: {
  showHits: boolean;
  setShowHits: (show: boolean) => void;
  setShowSearch: (show: boolean) => void;
}) {
  const { query, refine } = useSearchBox();

  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    refine(inputValue);
    if (inputValue === "") {
      setShowHits(false);
    }
  }, [inputValue]);
  const variants = {
    open: `flex flex-row gap-2 relative z-10 border border-[#242627] bg-black rounded-t-[12px] mt-4 items-center`,
    closed: `flex flex-row gap-2 relative z-10 border border-[#242627] bg-black mt-4 rounded-[12px] items-center`,
  };
  return (
    <div
      className={variants[showHits ? "open" : "closed"]}
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        className="ml-3"
        src={SearchIcon}
        alt="looking glass"
        width={32}
        height={32}
      />
      <input
        onFocus={() => {
          if (inputValue.length >= 1) {
            setShowHits(true);
          }
        }}
        className={`bg-black w-full border-none text-lg leading-10 focus:outline-none`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search documentation"
        spellCheck={false}
        autoFocus
        maxLength={512}
        type="search"
        value={inputValue}
        onChange={(event) => {
          if (event.currentTarget.value) {
            setShowHits(true);
          }
          setInputValue(event.currentTarget.value);
        }}
      />
      <button
        className="bg-lightGray rounded-[8px] p-1.5 mr-1 "
        onClick={() => {
          setShowSearch(false);
        }}
      >
        <span className="opacity-60">esc</span>
      </button>
    </div>
  );
}

function Hits() {
  const { hits, results } = useHits();
  const groups = results?.hits.reduce(
    (accum: { [key: string]: any[] }, item: any) => {
      if (item === "index") {
        return accum;
      }
      const key = item.categories
        .filter((cat: string) => cat !== "index")
        .join(" > ");
      if (accum[key]) {
        accum[key].push(item);
      } else {
        accum[key] = [item];
      }
      return accum;
    },
    {}
  );
  return (
    <>
      {!hits.length && <div>No results match your criteria.</div>}
      {groups &&
        Object.keys(groups).map((key) => {
          const hits = groups[key];
          return (
            <div key={key}>
              <div className="text-lg capitalize">{key.replace(/-/g, " ")}</div>
              <div className="">
                {hits.map((hit) => (
                  <Hit
                    hit={hit}
                    key={hit.objectID}
                    highlight={results?.query}
                  />
                ))}
              </div>
            </div>
          );
        })}
    </>
  );
}

function Hit({ hit, allowHighlight = true }: any) {
  const highlight = hit._highlightResult;
  return (
    <Link
      onClick={() => {
        addItem(hit);
      }}
      href={`/${hit.objectID.replace(/\d+-/, "")}${
        hit.hash ? `#${hit.hash}` : ""
      }`}
      className="rounded-md bg-white transition-colors bg-opacity-10 hover:bg-opacity-20 my-3 p-1 px-5 flex flex-row justify-between items-center"
    >
      <div>
        <div className="font-bold pt-2">
          {hit.header ? <div className="pb-2">{hit.header}</div> : null}
        </div>
        <div
          className="font-bold"
          dangerouslySetInnerHTML={{
            __html: hit.title?.replace("-", " "),
          }}
        />
        {hit.header !== hit.content && (
          <div className="text py-2 -mt-2">
            <span
              className="text-dimmer"
              dangerouslySetInnerHTML={{
                __html: allowHighlight
                  ? highlight.content.value.slice(0, 300)
                  : hit.content.slice(0, 300),
              }}
            />
          </div>
        )}
      </div>
      <Image src={Arrow} alt="arrow" width={25} height={30} />
    </Link>
  );
}
