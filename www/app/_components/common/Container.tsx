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
      <main className="flex flex-col lg:items-center justify-between">
        {children}
        <Footer />
      </main>
    </Body>
  );
}
