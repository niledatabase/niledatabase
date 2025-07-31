import type { Route } from "./+types/home";
import { nile } from "~/nile";

const { GET, POST, PUT, DELETE } = nile.handlers;

export const loader = async ({ request }: Route.LoaderArgs) => {
  switch (request.method.toUpperCase()) {
    case "GET":
      return GET(request);
    case "POST":
      return POST(request);
    case "PUT":
      return PUT(request);
    case "DELETE":
      return DELETE(request);
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
};

export const action = async ({ request }: Route.ActionArgs) => {
  switch (request.method.toUpperCase()) {
    case "POST":
      return POST(request);
    case "PUT":
      return PUT(request);
    case "DELETE":
      return DELETE(request);
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
};
