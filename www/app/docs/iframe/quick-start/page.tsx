import Body from "@/app/_components/Body";
import Quickstart from "../../getting-started/[[...slug]]/languages/sql.mdx";
export default async function Page() {
  return (
    <Body background={null}>
      <main className="mx-auto container bg-no-repeat bg-top bg-[size:100%] bg-docs">
        <article className="prose prose-invert p-4 mt-20 lg:max-w-[50rem] lg:w-[50rem] 2xl:w-[70rem] 2xl:max-w-[70rem] docs">
          <Quickstart />
        </article>
      </main>
    </Body>
  );
}
