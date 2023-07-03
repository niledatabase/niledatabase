import { buildNavParams } from "~/utils/buildNavParams.mjs";
import files from "~/static/sidenav.json"; // generated from npm run build or npm run init:docs

export default async function inspectDirectory() {
  if (process.env.VERCEL) {
    return [...files];
  }
  return buildNavParams();
}
