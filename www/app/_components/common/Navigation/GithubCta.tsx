import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/githubLogo.svg";
import DiscordLogo from "@/public/discord-blue.svg";

export function GithubCta() {
  return (
    <div className="flex flex-row gap-4 items-center">
      <Link
        href={"https://discord.com/invite/8UuBB84tTy"}
        target="_blank"
        className="shrink-0"
      >
        <button className="border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c] rounded-[10px] h-11 w-11 flex items-center justify-center">
          <Image
            src={DiscordLogo}
            alt="Discord Logo"
            width={20}
            height={20}
            data-image-zoom-disabled
          />
        </button>
      </Link>
      <Link
        href={"https://github.com/niledatabase/niledatabase"}
        target="_blank"
        className="shrink-0 github"
      >
        <button className="border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c] rounded-[10px] h-11 w-11 flex items-center justify-center">
          <Image
            src={Logo}
            alt="Github Logo"
            width={20}
            height={20}
            data-image-zoom-disabled
          />
        </button>
      </Link>
      <a href="https://console.thenile.dev" className="flex shrink-0">
        <button className="bg-blue text-black px-5 h-11 rounded-[10px] transition-colors whitespace-nowrap">
          Sign up
        </button>
      </a>
    </div>
  );
}
