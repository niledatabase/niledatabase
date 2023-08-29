import childProcess from 'child_process';
import path from 'path';
import { promisify } from 'util';
import yargs from 'yargs';
import fs from 'fs';
import cleanTemplateReadme from './cleanTemplateReadme.mjs';

const exec = promisify(childProcess.exec);

function convertGithubReadme(val) {
  const correctAssetPathname = val.replace(
    'github.com',
    'raw.githubusercontent.com'
  );
  const blobby = correctAssetPathname.replace('/blob', '');
  return blobby;
}

async function run() {
  // transform ts
  const srcDir = path.resolve('./app/templates/templates.ts');
  const swcArgs = [srcDir, '-o', path.resolve('./build/templates.mjs')];
  const command = ['swc', ...swcArgs].join(' ');
  await exec(command);

  // download and write readmes
  const templates = await import(path.resolve('./build/templates.mjs'));
  const entries = Object.entries(templates);

  const requesters = [];
  for (const [, value] of entries) {
    const rawUrl = convertGithubReadme(value.readmeUrl);
    requesters.push(fetch(rawUrl));
  }

  const readmes = await Promise.all(requesters);

  const files = [];
  for (const index in readmes) {
    const response = readmes[index];
    if (response.status === 404) {
      const [, { readmeUrl, name }] = entries[index];
      console.log(
        'unable to find README for',
        name,
        `at ${readmeUrl}.`,
        'Double check the config and be sure the repo is public.'
      );
    } else {
      files.push(new Response(response.body).text());
    }
  }

  if (!files.length) {
    console.log('No files written.');
  }
  const pages = await Promise.all(files);

  await fs.mkdirSync(path.resolve(`./app/templates/_build/readmes`), {
    recursive: true,
  });

  pages.forEach((page, idx) => {
    const [, config] = entries[idx];
    const readmePath = path.resolve(
      `./app/templates/_build/readmes/`,
      cleanTemplateReadme(config)
    );
    fs.writeFile(readmePath, page, 'utf-8', (err) => {
      if (!err) {
        console.log('wrote', `${config.readmeUrl}`);
      } else {
        console.log(err);
      }
    });
  });
}
yargs()
  .command({
    command: '$0',
    description: 'build templates',
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
