import Divider from "./Divider";
import Footer from "./Footer";
import Navigation from "./Navigation";
const baseClasses = ["min-h-screen", "container", "md:mx-auto", "relative"];
const variants = {
  base: "bg-base",
  community: "bg-community",
  templates: "bg-templates",
};

export default function Container({
  children,
  background = "base",
}: {
  children: JSX.Element | JSX.Element[];
  background?: null | "base" | "community" | "templates";
}) {
  if (background != null) {
    baseClasses.push(
      variants[background],
      "bg-no-repeat",
      "bg-top",
      "bg-[size:100%]"
    );
  }
  return (
    <div className={baseClasses.join(" ")}>
      <Navigation />
      <main className="flex flex-col items-center justify-between px-4 py-4 lg:px-24 lg:py-16">
        {children}
        <Divider />
        <Footer />
      </main>
    </div>
  );
}
