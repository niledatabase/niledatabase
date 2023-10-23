'use client';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Arrow from '@/public/icons/arrow.svg';
const itemOnPage = (item: any) => {
  return `/${item.slug?.join('/').replace(/\/?(index)?\.mdx/, '')}`;
};
const getPage = (indexed: any, remaining: any, page: string) => {
  const indexHref = `/${indexed?.slug
    ?.join('/')
    .replace(/\/?(index)?\.mdx/, '')}`;
  const itemHref = itemOnPage(remaining);
  return (
    (indexed && page.includes(indexHref)) ||
    (remaining && page.includes(itemHref))
  );
};
export function BaseListItem({
  item,
  page,
  withIcon,
  expander,
  activeCallback,
}: {
  item: any;
  page: string;
  withIcon?: boolean;
  expander: [boolean, (isExpanded: boolean) => void];
  activeCallback?: (page: string, item: any) => void;
}) {
  const [expanded, setExpanded] = expander;
  const href = `/${item.slug?.join('/').replace(/\/?(index)?\.mdx/, '')}`;
  const onPage = page === href || page === `${href}`;
  const itemClasses = [
    'active:font-bold',
    'text-[17px]',
    'py-2',
    'transition-all',
    'hover:opacity-100',
    'flex',
    'flex-row',
    'justify-between',
    'whitespace-break-spaces',
    expander[0] ? '' : 'h-content',
    onPage
      ? 'border-l-[1px] -ml-[10px] pl-[10px] opacity-100'
      : 'overflow-hidden opacity-60',
  ];

  useEffect(() => {
    const isPage = itemOnPage(item) === page;

    if (isPage) {
      activeCallback && activeCallback(page, item);
    }
  }, [expanded]);
  return (
    <li className={itemClasses.join(' ')}>
      <Link href={href} className="w-full">
        {item.method && (
          <span className="text-sm bg-gradient-text bg-clip-text text-transparent mr-3 border-lightGray border rounded-[6px] py-1 px-2">
            {item.method}
          </span>
        )}
        {item.header}
      </Link>
      {withIcon && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <Image
            alt="gray arrow"
            src={Arrow}
            width={24}
            height={24}
            className={`${
              expander[0] ? 'rotate-90' : 'rotate-0 opacity-40'
            } transition-all`}
          />
        </div>
      )}
    </li>
  );
}

function RenderItem({
  item,
  page,
  activeCallback,
}: {
  item: any;
  page: any;
  activeCallback?: (page: string, item: any) => void;
}) {
  const expander = useState(false);
  if (Array.isArray(item)) {
    const [itm] = item;
    if (itm.items.length) {
      return (
        <RenderItems
          items={itm.items}
          page={page}
          activeCallback={activeCallback}
        />
      );
    }
  }

  if (!item.items) {
    return (
      <BaseListItem
        item={item}
        page={page}
        expander={expander}
        activeCallback={activeCallback}
        withIcon={false}
      />
    );
  }

  const indexed = item.items.find((item: any) => item.name === 'index.mdx');
  const remaining = item.items.filter((item: any) => item.name !== 'index.mdx');
  const onPage = getPage(indexed, remaining, page);

  useEffect(() => {
    if (onPage) {
      expander[1](true);
    }
  }, [onPage, page]);

  if (!item.header && indexed) {
    return (
      <Fragment>
        <BaseListItem
          item={indexed}
          page={page}
          withIcon={true}
          expander={expander}
          activeCallback={activeCallback}
        />
        <ul
          className={`transition-all ml-1 pl-2 border-l-[1px] border-gray ${
            expander[0] ? 'opacity-100' : 'h-[0px] opacity-0 overflow-hidden'
          }`}
        >
          {remaining && (
            <RenderItems
              items={remaining}
              page={page}
              activeCallback={activeCallback}
            />
          )}
        </ul>
      </Fragment>
    );
  }

  if (item.items.length > 0) {
    if (!item.slug) {
      return (
        item.items && (
          <RenderItems
            items={item.items}
            page={page}
            activeCallback={activeCallback}
          />
        )
      );
    }
    return (
      <Fragment>
        <BaseListItem
          item={item}
          page={page}
          expander={expander}
          activeCallback={activeCallback}
        />
        <ul>
          {item.items && (
            <RenderItems
              items={item.items}
              page={page}
              activeCallback={activeCallback}
            />
          )}
        </ul>
      </Fragment>
    );
  }
}

export function RenderItems({
  items,
  page,
  activeCallback,
}: {
  items: any;
  page: string;
  activeCallback?: (page: string, item: any) => void;
}) {
  return items.map((item: any, idx: number) => {
    return (
      <RenderItem
        item={item}
        page={page}
        key={idx}
        activeCallback={activeCallback}
      />
    );
  });
}
