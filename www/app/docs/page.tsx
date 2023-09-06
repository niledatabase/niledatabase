import Link from "next/link";
import Heading from "../_components/common/Heading";
import Container from "./_components/Container";
import SideNavigation from "./_components/SideNavigation";

export default function Home() {
  return (
    <Container>
      <SideNavigation page={`/docs`} />
      <div className="pl-4 w-full flex flex-col h-full relative">
        <Heading
          text="Welcome to the docs"
          rootMargin="0px 0px 0px 0px"
          className="mt-4"
        />
        <div className="prose prose-invert w-[56rem] mt-20 px-4">
          <Link href="/docs/getting-started/languages">
            <h4>Languages</h4>
          </Link>
        </div>
      </div>
    </Container>
  );
}
