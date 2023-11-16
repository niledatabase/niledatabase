import { Template } from "../types";
import Link from "next/link";
import Image from "next/image";
import { sizes } from "@/app/_components/common/sizes";
export default function TemplateCard(props: Template) {
  const { name, description, author, imageSrc } = props;
  return (
    <div className="lg:w-1/3 md:w-1/2">
      <div className="p-4 h-full max-w-xs sm:max-w-none">
        <Link
          href={`/templates/${encodeURIComponent(name)}`}
          className="rounded-[8px] border border-gray overflow-hidden h-full flex flex-col"
        >
          <div className="bg-[#2D2D2D] overflow-hidden h-[218px] relative">
            <Image
              className="w-full h-full absolute object-cover object-left-top"
              src={imageSrc}
              alt={name}
              width={382}
              height={218}
              sizes={sizes}
            />
          </div>
          <div className="flex flex-col gap-3 px-8 py-4 justify-between flex-1">
            <div>
              <div className="text-[17px] text-left">{name}</div>
              <span className="text-[17px] text-[#8A8F98] h-[48px] text-left overflow-hidden text-ellipsis inline-block w-[calc(99%)] clip-description">
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
