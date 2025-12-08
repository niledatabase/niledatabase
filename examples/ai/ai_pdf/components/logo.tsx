import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-2 transition hover:opacity-75">
        <Image
          src="/logo.svg"
          alt="Logo"
          height={30}
          width={30}
          className="bg-white"
        />
        <p className={cn('font-switzerBold pb-1 text-lg text-primary')}>
          KnowledgeAI
        </p>
      </div>
    </Link>
  );
};
