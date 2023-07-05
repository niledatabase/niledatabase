import jwtDecode, { JwtPayload } from "jwt-decode";

export async function POST(req: Request) {
  const formData = await req.formData();
  const event = formData.get("event");

  if (event === "AUTH_ERROR") {
    return new Response(JSON.stringify({ error: formData.get("error") }), { status: 500 });
  }

  try {
    const accessToken = formData.get("access_token") as string;
    const decodedJWT = jwtDecode<JwtPayload>(accessToken);

    return new Response(JSON.stringify({
      token: accessToken,
      subject: decodedJWT.sub,
      audience: decodedJWT.aud,
      state: formData.get("state"),
      event,
    }, null, 2));
  } catch (e) {
    return new Response(JSON.stringify(e as Error), {status: 500});
  }
}
