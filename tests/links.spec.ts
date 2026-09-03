import { test, expect } from "@playwright/test";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

// Guards the class of defect where a link looks completely real and 404s: the site once
// advertised 60+ agendas, minutes, and forms, each with a file type and size beside it,
// and not one of the files existed.

const outDir = join(process.cwd(), "out");

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function resolves(href: string): Promise<boolean> {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return exists(join(outDir, "index.html"));

  const relative = clean.replace(/^\//, "");
  if (await exists(join(outDir, relative))) return true;
  if (await exists(join(outDir, relative, "index.html"))) return true;
  if (await exists(join(outDir, `${relative.replace(/\/$/, "")}.html`))) return true;
  return false;
}

test("every internal link in the export resolves to a real file", async () => {
  const hrefs = new Map<string, string>();

  for await (const file of walk(outDir)) {
    if (!file.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
      const href = match[1];
      // Skip external links, mail and telephone links, and pure fragments.
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
      if (!hrefs.has(href)) hrefs.set(href, file);
    }
  }

  expect(hrefs.size, "expected to find internal links to check").toBeGreaterThan(20);

  const broken: string[] = [];
  for (const [href, foundIn] of hrefs) {
    if (!(await resolves(href))) {
      broken.push(`${href}  (linked from ${foundIn.replace(outDir, "out")})`);
    }
  }

  expect(broken, `\nBroken internal links:\n  ${broken.join("\n  ")}`).toEqual([]);
});

test("every advertised document download exists and is a real PDF", async () => {
  const documents = new Set<string>();

  for await (const file of walk(outDir)) {
    if (!file.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(/href="([^"]*\/documents\/[^"]+\.pdf)"/g)) {
      documents.add(match[1].slice(match[1].indexOf("/documents/")));
    }
  }

  expect(documents.size, "expected the site to advertise document downloads").toBeGreaterThan(30);

  const problems: string[] = [];
  for (const path of documents) {
    const target = join(outDir, path.replace(/^\//, ""));
    if (!(await exists(target))) {
      problems.push(`${path} is missing`);
      continue;
    }
    const bytes = await readFile(target);
    if (!bytes.subarray(0, 5).toString("latin1").startsWith("%PDF-")) {
      problems.push(`${path} is not a PDF`);
    } else if (!bytes.subarray(-16).toString("latin1").includes("%%EOF")) {
      problems.push(`${path} is truncated`);
    }
  }

  expect(problems, `\nDocument problems:\n  ${problems.join("\n  ")}`).toEqual([]);
});
