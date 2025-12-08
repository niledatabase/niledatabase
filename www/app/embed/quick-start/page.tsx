import Body from '@/app/_components/Body';
import Quickstart from './sql.mdx';
export default async function Page() {
  return (
    <Body background={null}>
      <main className="bg-docs container mx-auto bg-[size:100%] bg-top bg-no-repeat">
        <article className="docs prose prose-invert mt-20 p-4 lg:w-[50rem] lg:max-w-[50rem] 2xl:w-[70rem] 2xl:max-w-[70rem]">
          <Quickstart />
        </article>
      </main>
    </Body>
  );
}
