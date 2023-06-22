import { glob } from "glob";

type Props = {
  params: any;
};

export default async function Page(props: Props) {
  const { params } = props;
  const { default: Component } = await import(
    `./${params.slug.join("/")}/content.mdx`
  );
  return (
    <div className="container mx-auto my-4">
      <article className="prose dark:prose-invert">
        <Component />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const files = await glob(`${process.cwd()}/app/docs/**/*.mdx`);
  const routes = files
    .map((file) => file.replace(/^.+\[\[...slug\]\]/, ""))
    .map((file) => {
      const parts = file.split("/");
      return parts.slice(0, parts.length - 1).filter(Boolean);
    })
    .map((route) => {
      return { slug: route };
    });
  return routes;
}
