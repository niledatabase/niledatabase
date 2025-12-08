import Image from 'next/image';
import Arrow from '@/public/icons/arrow.svg';
export default function GetStartedButton() {
  return (
    <div className="flex items-center">
      <button className="gradientButton flex w-[170px] flex-row gap-2 px-1 text-[16px] leading-[24px] after:rounded-[12px]">
        Join the waitlist
        <Image
          src={Arrow}
          alt="get started arrow"
          width={15}
          data-image-zoom-disabled
          height={20}
          priority
        />
      </button>
    </div>
  );
}
