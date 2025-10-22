/* eslint-disable no-console */
/* eslint-disable no-undef */
import https from "https";
import fs from "fs";
import path from "path";
import next from "next";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });
const dev = process.env.NODE_ENV !== "production";
const HOST = process.env.HOST || "thenile.dev";
const PORT = Number(process.env.PORT || 3000);
const CERT = process.env.CERT;
const KEY = process.env.KEY;

if (dev) {
  console.error(
    "❌ dev-ssl needs to be run in production mode. Set paths in .env in the packages/console directory\n" +
      "   NODE_ENV=production \\\n" +
      "   Also add DISABLE_REWRITES=true to stop crazy errors\\\n" +
      "   Be sure you run `npm run build`"
  );
  process.exit(1);
}
if (!CERT || !KEY) {
  console.error(
    "❌ Missing CERT/KEY. Set paths in .env in the packages/console directory\n" +
      "   CERT=/absolute/path/thenile.dev+1.pem \\\n" +
      "   KEY=/absolute/path/thenile.dev+1-key.pem \\\n" +
      "   node dev-ssl.mjs"
  );
  process.exit(1);
}

const app = next({ dev, hostname: HOST, port: PORT });
const handle = app.getRequestHandler();

await app.prepare();

const options = {
  key: fs.readFileSync(path.resolve(KEY)),
  cert: fs.readFileSync(path.resolve(CERT)),
};

https
  .createServer(options, (req, res) => handle(req, res))
  .listen(PORT, HOST, () => {
    console.log(
      `✅ Ready on https://${HOST}:${PORT} (if you set up your /etc/hosts correctly)`
    );
  });
