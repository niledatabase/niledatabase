import { buildNavParams } from "../../_build/buildNavParams.mjs";
import files from "../../_build/sidenav.json"; // generated from npm run build or npm run init:docs

export default async function inspectDirectory() {
  if (process.env.VERCEL) {
    return [...files];
  }
  return buildNavParams();
}
