import Image from "next/image";
import Link from "next/link";

export function CommunityLinks() {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between gap-10 items-center">
      <Link
        href="https://github.com/niledatabase/niledatabase/discussions"
        target="_blank"
      >
        <div className="flex flex-col gap-10 itemDivider p-8 max-w-[296px]">
          <Image
            src="/github-text.svg"
            alt="github text in black and white gradient"
            width={122}
            height={34}
            className="z-10 relative"
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-[20px] z-10 relative w-[320px]">
            Join Github discussions for roadmap and issues
          </div>
        </div>
      </Link>
      <Link href="https://discord.gg/8UuBB84tTy" target="_blank">
        <div className="flex flex-col gap-10 itemDivider p-8 max-w-[296px]">
          <Image
            src="/discord.svg"
            alt="github text in black and white gradient"
            width={189}
            height={52}
            className="z-10 relative"
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-[20px] z-10 relative w-[320px]">
            Participate in online conversations and forums
          </div>
        </div>
      </Link>
      <Link href="https://x.com/niledatabase" target="_blank">
        <div className="flex flex-col gap-10 itemDivider p-8 max-w-[296px]">
          <Image
            src="/x.svg"
            alt="github text in black and white gradient"
            width={47}
            height={44}
            className="z-10 relative"
          />
          <div className="bg-gradient-white bg-clip-text text-transparent text-center text-[20px] z-10 relative w-[280px]">
            Follow us on X to learn and network
          </div>
        </div>
      </Link>
    </div>
  );
}
