import Container from "@/app/_components/common/Container";
import ConsoleEmbed from "@/app/_components/ConsoleEmbed";
import { notFound } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ flag: string }>;
}) {
  const params = await searchParams;

  if (params.flag === process.env.FLAG) {
    return notFound();
  }
  return (
    <Container background={null}>
      <ConsoleEmbed domain={process.env.CONSOLE_URL} />
    </Container>
  );
}
