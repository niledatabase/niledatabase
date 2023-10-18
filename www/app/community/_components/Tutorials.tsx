import Link from "next/link";
import Image from "next/image";
import GradientButton from "@/app/_components/common/GradientButton";
import Heading from "@/app/_components/common/Heading";

export default function Tutorials() {
  return (
    <>
      <Heading text="Learn from our Tutorials" textAlign="left" />
      <div className="text-xl opacity-60 text-center lg:text-left mb-10">
        Get started with one of our Nile tutorials
      </div>

      <div className="flex justify-center mt-10">
        <Link href="https://www.youtube.com/@niledev">
          <GradientButton variant="soft">
            <Image
              src="/icons/tutorials.svg"
              alt="orange open book"
              width={24}
              height={24}
            />
            <span className="pl-2 bg-gradient-white bg-clip-text text-transparent subpixel-antialiased text-[16px]">
              Browse more tutorials
            </span>
          </GradientButton>
        </Link>
      </div>
    </>
  );
}
