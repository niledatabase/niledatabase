import Link from "next/link";
import Container from "./_components/common/Container";

export default function NotFound() {
  return (
    <Container background={null}>
      <div className="container mx-auto min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-8 px-4">
          <h1 className="text-[120px] md:text-[200px] font-bold leading-none bg-clip-text text-transparent bg-gradient-text">
            404
          </h1>
          <h2 className="text-[24px] md:text-[32px] text-center">
            Oops! This page seems to have drifted into the void
          </h2>
          <p className="text-[16px] md:text-[20px] text-center text-gray-400 max-w-[600px]">
            Don't worry, even the best databases have their moments. Let's get you back to familiar territory.
          </p>
          <div className="flex flex-row gap-4 mt-4">
            <Link href="/">
              <button className="bg-blue text-black transition-colors px-6 py-3 rounded-[10px] text-[16px] leading-[20px]">
                Return Home
              </button>
            </Link>
            <Link href="/docs">
              <button className="border border-[#1c1c1c] bg-[#000] hover:bg-[#1c1c1c] text-white transition-colors px-6 py-3 rounded-[10px] text-[16px] leading-[20px]">
                View Docs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
} 