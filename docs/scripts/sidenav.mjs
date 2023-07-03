import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import { buildNavParams } from "../utils/buildNavParams.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = path.join(__dirname, "..", "static");

export default async function run() {
  if (!fs.existsSync(STATIC_DIR)) {
    fs.mkdirSync(STATIC_DIR, { recursive: true });
  }
  const routes = await buildNavParams();
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "static", "sidenav.json"),
      JSON.stringify(routes, null, 2)
    );
  } catch (e) {
    console.error(e);
  }
}

run();
