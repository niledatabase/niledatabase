import Link from "next/link";
import Heading from "../_components/common/Heading";
import Container from "./_components/Container";
import SideNavigation from "./_components/SideNavigation";

export default function Home() {
  return (
    <Container>
      <SideNavigation page={`/docs`} />
      <div className="w-[2px] bg-border"></div>
      <div className="pl-4 w-full flex flex-col h-full relative">
        <Heading
          text="Welcome to the docs"
          rootMargin="0px 0px 0px 0px"
          className="mt-4"
        />
        <div className="prose dark:prose-invert max-w-5xl mt-20 px-4">
          <Link href="/docs/guides/getting-started">
            <h4>Getting started</h4>
          </Link>
        </div>
      </div>
    </Container>
  );
}
