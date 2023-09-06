import Navigation from "@/app/_components/common/Navigation";
import SideNavigation from "../SideNavigation";
import Footer from "@/app/_components/common/Footer";

export default function Container({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  //
  return (
    <>
      <Navigation className="border-gray border-b-[1px]" />
      <main className="min-h-screen mx-auto container">
        <div className="flex flex-row">{children}</div>
      </main>
      <Footer className="mt-40 container mx-auto" />
    </>
  );
}
