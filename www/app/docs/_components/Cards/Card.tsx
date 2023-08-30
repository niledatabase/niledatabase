import Link from 'next/link';
import { NavigationRoots } from '../SideNavigation';

type Props = {
  file: string;
  root: NavigationRoots;
};
export default async function Card(props: Props) {
  const { file, root } = props;
  const { meta } = await import(
    `../../${root}/\[\[...slug\]\]${file.slice(1, file.length)}`
  );
  if (!meta) {
    return null;
  }
  const href = file
    .split('/')
    .map((part) => {
      let maybePart = part;
      if (/\.mdx$/.test(maybePart)) {
        maybePart = maybePart.replace(/\.mdx/, '');
      }
      return maybePart;
    })
    .join('/');
  return (
    <Link href={`/docs/${root}/${href}`} style={{ textDecoration: 'none' }}>
      <div className="border-2 w-64 px-4 py-1 rounded border-slate-600 hover:border-slate-50 transition-colors">
        <h4 className="text-lg">{meta.title}</h4>
        <p className="text-sm font-light">{meta.description}</p>
      </div>
    </Link>
  );
}
