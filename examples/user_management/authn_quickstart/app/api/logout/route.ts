import { cookies} from "next/headers";

// Clean up the cookies and redirect to the home page
export async function GET() {
    //cookies().set('authData', '', { expires: new Date(0) });
    //cookies().set('errorData', '', { expires: new Date(0) });
    cookies().delete('authData');
    cookies().delete('errorData');
    return new Response(null, {
        headers: { 'Location': '/' },
        status: 302,
    });
}