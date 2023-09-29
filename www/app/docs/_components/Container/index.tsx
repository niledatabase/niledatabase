import Navigation from "@/app/_components/common/Navigation";
import Footer from "@/app/_components/common/Footer";
import Body from "@/app/_components/Body";

export default function Container({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Body background={null}>
      <Navigation className="lg:border-gray lg:border-b-[1px] lg:bg-black" />
      <main className="min-h-screen mx-auto container bg-no-repeat bg-top bg-[size:100%] bg-docs">
        <div className="flex flex-row">{children}</div>
      </main>
      <Footer className="my-40 container mx-auto" />
    </Body>
  );
}
