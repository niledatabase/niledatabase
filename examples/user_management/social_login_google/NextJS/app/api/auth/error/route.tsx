import { redirect } from "next/navigation";
import { handlers } from "../../[...nile]/nile";

export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("error") === "OAuthAccountNotLinked") {
    redirect("/errors/oauth-not-linked");
  }
  return handlers.GET(req);
}
