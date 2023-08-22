import Divider from "./Divider";
import Footer from "./Footer";
import Navigation from "./Navigation";
const baseClasses = ["min-h-screen", "container", "mx-auto", "relative"];
export default function Home({
  hidePattern = false,
  children,
}: {
  children: JSX.Element | JSX.Element[];
  hidePattern?: boolean;
}) {
  if (!hidePattern) {
    baseClasses.push("bg-pattern", "bg-no-repeat", "bg-top", "bg-[size:100%]");
  }
  return (
    <div className={baseClasses.join(" ")}>
      <Navigation />
      <main className="flex flex-col items-center justify-between px-24 py-16">
        {children}
        <Divider />
        <Footer />
      </main>
    </div>
  );
}
