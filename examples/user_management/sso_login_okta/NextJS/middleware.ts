import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import middleware from "@niledatabase/edge";

// This function can be marked `async` if using `await` inside
export default async function doMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  middleware(request, response, ["/api/:tenantId/users"]);
  return response;
}

export const config = {
  matcher: ["/api/:tenantId*", "/:tenantId*/users"],
};
