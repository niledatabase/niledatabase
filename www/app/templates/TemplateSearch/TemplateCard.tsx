import { Template } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { sizes } from '@/app/_components/common/sizes';
export default function TemplateCard(props: Template) {
  const { name, description, author, imageSrc } = props;
  return (
    <div className="md:w-1/2 lg:w-1/3">
      <div className="h-full max-w-xs p-4 sm:max-w-none">
        <Link
          href={`/templates/${encodeURIComponent(name)}`}
          className="flex h-full flex-col overflow-hidden rounded-[8px] border border-gray"
        >
          <div className="relative h-[218px] overflow-hidden bg-[#2D2D2D]">
            <Image
              className="absolute h-full w-full object-cover object-left-top"
              src={imageSrc}
              alt={name}
              width={382}
              height={218}
              sizes={sizes}
              data-image-zoom-disabled
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-3 px-8 py-4">
            <div>
              <div className="text-left text-[17px]">{name}</div>
              <span className="clip-description inline-block h-[48px] w-[calc(99%)] overflow-hidden text-ellipsis text-left text-[17px] text-[#8A8F98]">
                {description}
              </span>
            </div>
            <div className="text-left">
              <span className="text-[17px]">
                <span className="text-[#8A8F98]">By:</span> {author}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
