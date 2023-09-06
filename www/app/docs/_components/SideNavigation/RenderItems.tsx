'use client';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Image from 'next/image';

import Link from 'next/link';
export function BaseListItem({
  item,
  page,
  withIcon,
  expander,
}: {
  item: any;
  page: string;
  withIcon?: boolean;
  expander: [boolean, (isExpanded: boolean) => void];
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
    expander[0] ? '' : 'h-[40px]',
    onPage
      ? 'border-l-[1px] -ml-[10px] pl-[10px] opacity-100'
      : 'overflow-hidden opacity-60',
  ];

  return (
    <li className={itemClasses.join(' ')}>
      <Link href={href}>{item.header}</Link>
      {withIcon && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <Image
            alt="gray arrow"
            src="/icons/arrow.svg"
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

function RenderItem({ item, page }: { item: any; page: any }) {
  const expander = useState(false);
  if (Array.isArray(item)) {
    const [itm] = item;
    if (itm.items.length) {
      return <RenderItems items={itm.items} page={page} />;
    }
  }

  if (!item.items) {
    return <BaseListItem item={item} page={page} expander={expander} />;
  }

  const indexed = item.items.find((item: any) => item.name === 'index.mdx');
  const remaining = item.items.filter((item: any) => item.name !== 'index.mdx');
  const indexHref = `/${indexed?.slug
    ?.join('/')
    .replace(/\/?(index)?\.mdx/, '')}`;
  const itemHref = `/${remaining.slug
    ?.join('/')
    .replace(/\/?(index)?\.mdx/, '')}`;
  useEffect(() => {
    if (page.includes(indexHref) || page.includes(itemHref)) {
      expander[1](true);
    }
  }, [indexHref, itemHref, page]);

  if (!item.header && indexed) {
    return (
      <Fragment>
        <BaseListItem
          item={indexed}
          page={page}
          withIcon={true}
          expander={expander}
        />
        <ul
          className={`transition-all ml-1 pl-2 border-l-[1px] border-gray ${
            expander[0] ? 'opacity-100' : 'h-[0px] opacity-0 overflow-hidden'
          }`}
        >
          {remaining && <RenderItems items={remaining} page={page} />}
        </ul>
      </Fragment>
    );
  }

  if (item.items.length > 0) {
    if (!item.slug) {
      return item.items && <RenderItems items={item.items} page={page} />;
    }
    return (
      <Fragment>
        <BaseListItem item={item} page={page} expander={expander} />
        <ul>{item.items && <RenderItems items={item.items} page={page} />}</ul>
      </Fragment>
    );
  }
}

export function RenderItems({ items, page }: { items: any; page: string }) {
  return items.map((item: any, idx: number) => {
    return <RenderItem item={item} page={page} key={idx} />;
  });
}
