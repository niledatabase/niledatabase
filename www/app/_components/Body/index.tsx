import localFont from "next/font/local";
import { Inter } from "next/font/google";

export type Background = null | "base" | "community" | "templates" | "circular";
const aeonik = localFont({
  src: "../../../public/fonts/Aeonik-Regular.woff2",
  display: "swap",
  variable: "--font-aeonik",
});
const variants = {
  base: "bg-no-repeat bg-top lg:bg-[size:105%] bg-[size:200%] bg-base",
  community:
    "bg-no-repeat bg-top lg:bg-[size:105%] bg-[size:200%] bg-community",
  templates:
    "bg-no-repeat md:bg-[size:105%] bg-templates xl:bg-[size:80%] 2xl:bg-[center_top] xl:bg-[center_top] md:bg-[center_100px] lg:bg-[center_120px] bg-[center_-50px] bg-[size:420%] sm:bg-[size:158%]",
  circular: "",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export default function Body({
  children,
  background,
}: {
  background: Background;
  children: string | JSX.Element | JSX.Element[];
}) {
  return (
    <body
      className={`${aeonik.variable} ${inter.variable} ${
        background ? variants[background] : null
      }`}
    >
      {background === "circular" && (
        <div className="w-screen absolute pointer-events-none -z-10 top-0 bg-circular opacity-[0.15] h-[60%]" />
      )}
      {children}
    </body>
  );
}
