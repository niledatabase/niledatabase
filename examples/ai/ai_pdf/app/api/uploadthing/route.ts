import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// export const maxDuration = 30;
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
