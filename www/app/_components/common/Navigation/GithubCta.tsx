import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/githubLogo.svg";
import GradientButton from "../GradientButton";

export function GithubCta() {
  return (
    <Link
      href={"https://github.com/niledatabase/niledatabase"}
      target="_blank"
      className="block github"
    >
      <div className="flex flex-row gap-4">
        <button className="grayBorder">
          <div className="flex flex-row py-3 px-4 items-center gap-[10px]">
            <span className="whitespace-nowrap">Star us on</span>
            <Image src={Logo} alt="Github Logo" width={20} height={20} />
          </div>
        </button>
        <GradientButton subclasses="!p-[1px]">
          <div className="bg-blue text-black px-5 py-2.5 rounded-md">
            Sign up
          </div>
        </GradientButton>
      </div>
    </Link>
  );
}
