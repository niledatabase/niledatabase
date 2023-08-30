import { Template } from "../types";
import Link from "next/link";
import Image from "next/image";
import { sizes } from "@/app/_components/common/sizes";
export default function TemplateCard(props: Template) {
  const { name, description, author, imageSrc } = props;
  return (
    <Link
      href={`/templates/${encodeURIComponent(name)}`}
      className="rounded-[20px] border border-gray overflow-hidden w-[382px] h-[386px]"
    >
      <div className="h-[218px] bg-[#2D2D2D] overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          width={382}
          height={218}
          sizes={sizes}
        />
      </div>
      <div className="flex flex-col gap-3 px-8 py-4">
        <div className="text-[17px]">{name}</div>
        <div className="text-[17px] text-[#8A8F98] h-[48px] overflow-scroll">
          {description}
        </div>
        <div>
          <span className="text-[17px]">
            <span className="text-[#8A8F98]">By:</span> {author}
          </span>
        </div>
      </div>
    </Link>
  );
}
