import Link from "next/link";
import { OpenPositionMetadata } from "./OpenPositionMetadata";

export default function CareerPost(props: OpenPositionMetadata) {
  return (
    <Link href={props.slug}>
      <div className="transition-all p-4 border border-transparent hover:border-lightGray border-x-0 rounded-xl">
        <div className="text-xl">{props.header}</div>
        <div className="flex flex-row opacity-60 gap-1">
          <div>{props.location}</div>/<div>{props.office}</div>/
          <div>{props.fullTime ? "Full time" : "Part time"}</div>
        </div>
      </div>
    </Link>
  );
}
