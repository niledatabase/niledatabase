import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export type Background = null | 'base' | 'community' | 'templates';
const aeonik = localFont({
  src: '../../../public/fonts/Aeonik-Regular.woff2',
  display: 'swap',
  variable: '--font-aeonik',
});
const baseClasses = ['min-h-screen', 'relative'];
const variants = {
  base: 'bg-base',
  community: 'bg-community',
  templates: 'bg-templates',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
export default function Body({
  children,
  background,
}: {
  background: Background;
  children: string | JSX.Element | JSX.Element[];
}) {
  if (background != null) {
    baseClasses.push(
      variants[background],
      'bg-no-repeat',
      'bg-top',
      'lg:bg-[size:105%]',
      'bg-[size:200%]'
    );
  }
  return (
    <body
      className={`${aeonik.variable} ${inter.variable} ${baseClasses.join(
        ' '
      )}`}
    >
      {children}
    </body>
  );
}
