export async function GET() {
  return new Response(null, {
    status: 301,
    headers: {
      'Location': '/blog/feed.atom',
      'Content-Type': 'application/atom+xml;charset=utf-8'
    }
  });
} 