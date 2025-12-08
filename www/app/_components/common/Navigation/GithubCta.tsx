import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/githubLogo.svg';
import DiscordLogo from '@/public/discord-blue.svg';

export function GithubCta() {
  return (
    <div className="flex flex-row items-center gap-4">
      <Link
        href={'https://discord.com/invite/8UuBB84tTy'}
        target="_blank"
        className="shrink-0"
      >
        <button className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c]">
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
        href={'https://github.com/niledatabase/niledatabase'}
        target="_blank"
        className="github shrink-0"
      >
        <button className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c]">
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
        <button className="h-11 whitespace-nowrap rounded-[10px] bg-blue px-5 text-black transition-colors">
          Sign up
        </button>
      </a>
    </div>
  );
}
