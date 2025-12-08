import Link from 'next/link';
import Image from 'next/image';
import { Authors } from '../Authors';
import { Metadata } from '../Metadata';
import Coffee from '@/public/blog/coffee.webp';

export default function Hit({ hit }: any) {
  const [publishDate] = /\d{4}-\d{2}-\d{2}/.exec(hit.objectID) ?? '';
  const cleaned = hit.objectID.replace(/\d{4}-\d{2}-\d{2}-/, '');
  const slug = cleaned.replace('.mdx', '');
  return (
    <div className="w-full md:w-1/2 lg:w-1/3">
      <div className="rounded-xl p-4 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-gradient-to-b hover:from-white/[0.03] hover:to-white/[0.01] hover:shadow-lg hover:shadow-black/20">
        <Link href={`/blog/${slug}`}>
          <div className="mb-4 flex aspect-video w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-[#2d2d2d] shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-white/10 hover:shadow-xl dark:bg-[#1f1f1f]">
            {hit?.image ? (
              <Image
                className="hover:scale-102 aspect-video w-full transition-transform duration-300 ease-in-out"
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
                className="hover:scale-102 aspect-video w-full transition-transform duration-300 ease-in-out"
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
