import Link from 'next/link';
import { OpenPositionMetadata } from './OpenPositionMetadata';

export default function CareerPost(props: OpenPositionMetadata) {
  return (
    <Link href={props.slug}>
      <div className="rounded-xl border border-x-0 border-transparent p-4 transition-all hover:border-lightGray">
        <div className="text-xl">{props.header}</div>
        <div className="flex flex-row gap-1 opacity-60">
          <div>{props.location}</div>/<div>{props.office}</div>/
          <div>{'Full time'}</div>
        </div>
      </div>
    </Link>
  );
}
