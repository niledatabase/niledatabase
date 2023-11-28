import { processFile } from "../_build/processFile.mjs";

import nodePath from "node:path";
import { fileURLToPath } from "url";
export async function getTitle({
  path,
  metadata,
  url,
}: {
  url: string;
  path: void | string;
  metadata: any;
}) {
  const __filename = fileURLToPath(url);
  const __dirname = nodePath.dirname(__filename);
  const STATIC_DIR = nodePath.join(__dirname);
  if (!path) {
    return "Nile database";
  }
  const file = processFile(nodePath.join(STATIC_DIR, path));
  const { metadata: fileMetadata }: { metadata: any } = await file;
  return `${
    metadata?.title ?? fileMetadata?.firstHeader ?? fileMetadata?.header
  } - Nile database docs`;
}
