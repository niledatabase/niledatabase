import Body, { Background } from "../Body";
import Divider from "./Divider";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Container({
  children,
  background = "base",
}: {
  children: JSX.Element | JSX.Element[];
  background?: Background;
}) {
  return (
    <Body background={background}>
      <Navigation />
      <main className="flex flex-col items-center justify-between px-4 py-4 lg:px-24 lg:py-16 overflow-hidden container mx-auto">
        {children}
        <Divider flip={true} />
        <Footer />
      </main>
    </Body>
  );
}
