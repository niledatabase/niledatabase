import { cookies } from 'next/headers'

// Clean up the cookies and redirect to the home page
export async function GET() {
    cookies().delete('token');
    return new Response(null, {
        headers: { 'Location': '/' },
        status: 302,    
    });
}