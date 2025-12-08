import Container from '@/app/_components/common/Container';
import { notFound } from 'next/navigation';
import ConsoleEmbed from '../_components/ConsoleEmbed';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ flag?: string }>;
}) {
  const params = await searchParams;

  if (params?.flag === process.env.FLAG) {
    return (
      <Container background={null}>
        <ConsoleEmbed domain={process.env.CONSOLE_URL} />
      </Container>
    );
  }

  return notFound();
}
