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
      <div className="p-4 transition-all duration-300 ease-in-out rounded-xl hover:-translate-y-0.5 hover:bg-gradient-to-b hover:from-white/[0.03] hover:to-white/[0.01] hover:shadow-lg hover:shadow-black/20">
        <Link href={`/blog/${slug}`}>
          <div className="bg-[#2d2d2d] dark:bg-[#1f1f1f] rounded-xl overflow-hidden flex-shrink-0 mb-4 flex items-center justify-center aspect-video w-full border border-white/5 transition-all duration-300 ease-in-out shadow-md hover:border-white/10 hover:shadow-xl hover:-translate-y-0.5">
            {hit?.image ? (
              <Image
                className="aspect-video w-full transition-transform duration-300 ease-in-out hover:scale-102"
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
                className="aspect-video w-full transition-transform duration-300 ease-in-out hover:scale-102"
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
