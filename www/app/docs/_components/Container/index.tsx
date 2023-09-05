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
      <div className="min-h-screen relative flex flex-col">
        <main className="flex flex-row flex-1 mx-auto">{children}</main>
        <Footer className="mt-40 container mx-auto" />
      </div>
    </>
  );
}
