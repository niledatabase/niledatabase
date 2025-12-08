import path from 'node:path';
import { createLoader } from '@mdx-js/node-loader';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const providerSource = path.join(__dirname, './mdx-components.mjs');

// Load is for Node 17+, the rest for 12-16.
const { load, getFormat, transformSource } = createLoader({
  fixRuntimeWithoutExportMap: false,
  useDynamicImport: true,
  providerImportSource: providerSource,
});

export { load, getFormat, transformSource };
