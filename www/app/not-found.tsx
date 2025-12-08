import Link from 'next/link';
import Container from './_components/common/Container';

export default function NotFound() {
  return (
    <Container background={null}>
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-8 px-4">
          <h1 className="bg-gradient-text bg-clip-text text-[120px] font-bold leading-none text-transparent md:text-[200px]">
            404
          </h1>
          <h2 className="text-center text-[24px] md:text-[32px]">
            Oops! This page seems to have drifted into the void
          </h2>
          <p className="text-gray-400 max-w-[600px] text-center text-[16px] md:text-[20px]">
            Don't worry, even the best databases have their moments. Let's get
            you back to familiar territory.
          </p>
          <div className="mt-4 flex flex-row gap-4">
            <Link href="/">
              <button className="rounded-[10px] bg-blue px-6 py-3 text-[16px] leading-[20px] text-black transition-colors">
                Return Home
              </button>
            </Link>
            <Link href="/docs">
              <button className="rounded-[10px] border border-[#1c1c1c] bg-[#000] px-6 py-3 text-[16px] leading-[20px] text-white transition-colors hover:bg-[#1c1c1c]">
                View Docs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
