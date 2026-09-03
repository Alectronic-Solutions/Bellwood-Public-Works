// Minimal static file server for the exported site in out/.
// Used only by the accessibility test run, so it deliberately has no dependencies.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

async function readIfFile(path) {
  try {
    const info = await stat(path);
    if (!info.isFile()) return null;
    return await readFile(path);
  } catch {
    return null;
  }
}

// The export uses trailingSlash, so /contact/ maps to out/contact/index.html.
// Try the path as a file first, then as a directory index.
async function resolve(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const base = join(root, safe);

  const direct = await readIfFile(base);
  if (direct) return { body: direct, path: base };

  const index = join(base, "index.html");
  const asIndex = await readIfFile(index);
  if (asIndex) return { body: asIndex, path: index };

  return null;
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, `http://localhost:${port}`);
  const found = await resolve(pathname);

  if (found) {
    response.writeHead(200, { "content-type": contentTypes[extname(found.path)] ?? "application/octet-stream" });
    response.end(found.body);
    return;
  }

  const notFound = await readIfFile(join(root, "404.html"));
  response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
  response.end(notFound ?? "Not found");
}).listen(port, () => {
  console.log(`Serving ${root} on http://localhost:${port}`);
});
