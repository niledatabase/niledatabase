import fs from "node:fs";
import path from "node:path";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STATIC_DIR = path.join(__dirname);

async function run() {
  const files = await imagemin(["public/**/*.{jpg,png,svg}"], {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
      imageminSvgo({
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
        ],
      }),
    ],
  });

  for (const file of files) {
    // rewrite file to src path
    console.log(file);
    fs.writeFileSync(
      path.join(STATIC_DIR, "../..", file.sourcePath),
      file.data
    );
  }
}
run();
