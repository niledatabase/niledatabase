import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto my-4 ">
      <div className="prose dark:prose-invert">
        <h1>niledatabase documentation</h1>
        <Link href="/docs/guides/getting-started">
          <h4>Getting started</h4>
        </Link>
      </div>
    </main>
  );
}
