import { createReadStream } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const cmsDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectDirectory = path.resolve(cmsDirectory, '..');
const seedPath = path.resolve(cmsDirectory, 'seed/seed.json');
const localSeedPath = path.resolve(cmsDirectory, '.emdash/seed.local.json');
const mediaDirectory = path.resolve(projectDirectory, 'public/cms');
const emdashBinary = path.resolve(cmsDirectory, 'node_modules/.bin/emdash');

const contentTypes = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const rewriteMediaUrls = ({ value, mediaBaseUrl }) => {
  if (Array.isArray(value)) {
    return value.map((item) => rewriteMediaUrls({ value: item, mediaBaseUrl }));
  }

  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (typeof value.url === 'string' && value.url.startsWith('/cms/')) {
    const filename = value.url.slice('/cms/'.length);

    return {
      ...value,
      url: `${mediaBaseUrl}/${encodeURIComponent(filename)}`,
    };
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      rewriteMediaUrls({ value: item, mediaBaseUrl }),
    ]),
  );
};

const isInsideMediaDirectory = (filename) => path.basename(filename) === filename;

const startMediaServer = async () => {
  const server = createServer((request, response) => {
    const requestedPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filename = requestedPath.replace(/^\//, '');

    if (!filename || !isInsideMediaDirectory(filename)) {
      response.writeHead(404).end('Not found');
      return;
    }

    const filePath = path.resolve(mediaDirectory, filename);

    createReadStream(filePath)
      .on('error', () => response.writeHead(404).end('Not found'))
      .on('open', () => {
        response.writeHead(200, {
          'content-type': contentTypes[path.extname(filename)] ?? 'application/octet-stream',
        });
      })
      .pipe(response);
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  return server;
};

const runSeed = (args) =>
  new Promise((resolve, reject) => {
    const child = spawn(emdashBinary, ['seed', path.relative(cmsDirectory, localSeedPath), ...args], {
      cwd: cmsDirectory,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`emdash seed exited with code ${code}`)),
    );
  });

const server = await startMediaServer();
const { port } = server.address();

try {
  const seed = JSON.parse(await readFile(seedPath, 'utf8'));
  const localSeed = rewriteMediaUrls({ value: seed, mediaBaseUrl: `http://127.0.0.1:${port}` });

  await mkdir(path.dirname(localSeedPath), { recursive: true });
  await writeFile(localSeedPath, `${JSON.stringify(localSeed, null, 2)}\n`, 'utf8');
  await runSeed(process.argv.slice(2));
} finally {
  server.close();
  await rm(localSeedPath, { force: true });
}
