import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/githubLogo.svg";

export function GithubCta() {
  return (
    <div className="flex flex-row gap-4">
      <Link
        href={"https://github.com/niledatabase/niledatabase"}
        target="_blank"
        className="shrink-0 github"
      >
        <button className="border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c] rounded-[10px]">
          <div className="flex flex-row py-3 px-4 items-center gap-[10px]">
            <span className="whitespace-nowrap">Star us on</span>
            <Image src={Logo} alt="Github Logo" width={20} height={20} />
          </div>
        </button>
      </Link>
      <a href="https://console.thenile.dev" className="flex shrink-0">
        <button className="bg-blue text-black px-5 py-2.5 rounded-[10px] transition-colors whitespace-nowrap">
          Sign up
        </button>
      </a>
    </div>
  );
}
