import Image from "next/image";
import Link from "next/link";
import { Authors } from "./_components/Authors";
import { Metadata } from "./_components/Metadata";
import { parseMetadata } from "./_components/parseMetadata";
import Coffee from "@/public/blog/coffee.jpg";

export async function AsyncArticle({ fileName }: { fileName: string }) {
  const { default: Article, metadata } = await import(`${fileName}`);
  const { publishDate, slug, readLength } = parseMetadata(fileName, Article);
  return (
    <Link href={`/blog/${slug}`}>
      <div className="w-[384px]">
        <div className="bg-[#2D2D2D] rounded-xl w-[384px] h-[242px] overflow-hidden flex-shrink-0 mb-4 items-center justify-center flex">
          {metadata?.image ? (
            <Image
              alt={metadata.image}
              width={384}
              height={242}
              src={`/blog/${metadata.image}`}
            />
          ) : (
            <Image alt="coffee" width={384} height={242} src={Coffee} />
          )}
        </div>
        <Metadata
          publishDate={publishDate}
          readLength={readLength}
          title={metadata?.title}
          sizzle={metadata?.sizzle}
        />
        <Authors authors={metadata?.authors} />
      </div>
    </Link>
  );
}
