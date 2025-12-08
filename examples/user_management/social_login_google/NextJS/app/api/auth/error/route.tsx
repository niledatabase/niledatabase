import { redirect } from 'next/navigation';
import { nile } from '../../[...nile]/nile';

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get('error') === 'OAuthAccountNotLinked') {
    redirect('/errors/oauth-not-linked');
  }
  return nile.handlers.GET(req) as Promise<Response>;
}
