import Link from "next/link";
import Image from "next/image";
import Star from "@/public/githubStar.svg";
import Logo from "@/public/githubLogo.svg";

export function GithubCta() {
  return (
    <div className="flex">
      <Link
        href={"https://github.com/niledatabase/niledatabase"}
        target="_blank"
        className="block github"
      >
        <button className="github-star">
          <div className="flex flex-row py-3 px-4 border-[#242627] border rounded-xl items-center gap-[10px] bg-black">
            <div className="relative">
              <svg
                className="shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  className="trasition-all"
                  d="M9.05931 8.23516L10.5595 3.61804L12.0597 8.23516C12.1534 8.52358 12.4222 8.71885 12.7254 8.71885H17.5802L13.6526 11.5724C13.4073 11.7506 13.3046 12.0666 13.3983 12.355L14.8985 16.9721L10.971 14.1186C10.7256 13.9403 10.3934 13.9403 10.1481 14.1186L6.2205 16.9721L7.72069 12.355C7.8144 12.0666 7.71174 11.7506 7.4664 11.5724L3.53884 8.71885H8.39357C8.69683 8.71885 8.9656 8.52358 9.05931 8.23516Z"
                  stroke="url(#paint0_linear_2978_477)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2978_477"
                    x1="10.5595"
                    y1="2"
                    x2="10.5595"
                    y2="18.2812"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8F8F8" />
                    <stop offset="1" stopColor="#8C8C8C" />
                  </linearGradient>
                </defs>
              </svg>
              <Image
                className="absolute star top-[1px] left-[1px]"
                src={Star}
                alt="Github Logo"
                width={20}
                height={20}
              />
            </div>
            <span className="w-px h-5 opacity-20 bg-[#D9D9D9] shrink-0"></span>
            <span className="bg-gradient-white bg-clip-text text-transparent whitespace-nowrap">
              Star us on
            </span>
            <Image src={Logo} alt="Github Logo" width={20} height={20} />
          </div>
        </button>
      </Link>
    </div>
  );
}
