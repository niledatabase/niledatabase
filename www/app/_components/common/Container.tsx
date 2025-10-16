import { ReactNode } from "react";
import Body, { Background } from "../Body";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Container({
  children,
  background = "base",
}: {
  children: ReactNode;
  background?: Background;
}) {
  return (
    <Body background={background}>
      <Navigation />
      <main className="flex flex-col lg:items-center justify-between">
        {children as any}
        <Footer />
      </main>
    </Body>
  );
}
