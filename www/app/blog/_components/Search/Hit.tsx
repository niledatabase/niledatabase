import Link from "next/link";
import Image from "next/image";
import { Authors } from "../Authors";
import { Metadata } from "../Metadata";
import Coffee from "@/public/blog/coffee.webp";

export default function Hit({ hit }: any) {
  const [publishDate] = /\d{4}-\d{2}-\d{2}/.exec(hit.objectID) ?? "";
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
                data-image-zoom-disabled
                width={416}
                height={242}
                src={`/blog/${hit.image}`}
              />
            ) : (
              <Image
                alt="coffee"
                className="aspect-video w-full"
                data-image-zoom-disabled
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
