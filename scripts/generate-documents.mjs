// Generates a real, downloadable PDF for every document the site links to.
//
// The site advertises 60+ agendas, minutes, and forms with a file type and size beside
// each link. Without this step every one of those links is a 404, which is the first
// thing a visitor discovers when they click a download.
//
// It runs after the build and scans the exported HTML rather than reading /content, so
// it automatically picks up meeting document names whose dates shift at build time.
// Output goes to out/ (what ships) and to public/ (so dev mode resolves them too).
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, dirname, relative } from "node:path";

const outDir = join(process.cwd(), "out");
const publicDir = join(process.cwd(), "public");

const LINK_PATTERN = /<a[^>]+href="([^"]*\/documents\/[^"]+\.pdf)"[^>]*>([^<]*)</g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

/** PDF text strings are Latin-1 with (, ) and \ escaped. */
function pdfString(text) {
  return [...text]
    .map((char) => (char.codePointAt(0) > 255 ? "?" : char))
    .join("")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    if (line && `${line} ${word}`.length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Builds a single page PDF using the base-14 Helvetica faces, so nothing needs to be
 * embedded. Sets /Lang and marks the document so a reader announces it in the right
 * language. These are not fully tagged PDF/UA documents, which the accessibility
 * statement says plainly.
 */
function buildPdf(title, subtitle) {
  const titleLines = wrap(title, 46);

  const body = [];
  body.push("BT", "/F1 20 Tf", "72 700 Td", "24 TL");
  titleLines.forEach((line, index) => {
    body.push(index === 0 ? `(${pdfString(line)}) Tj` : `T* (${pdfString(line)}) Tj`);
  });
  body.push("ET");

  body.push("BT", "/F2 11 Tf", `72 ${700 - titleLines.length * 24 - 18} Td`, "(City of Bellwood, Department of Public Works) Tj", "ET");
  body.push("BT", "/F2 11 Tf", `72 ${700 - titleLines.length * 24 - 36} Td`, `(${pdfString(subtitle)}) Tj`, "ET");

  body.push("0.84 0.86 0.88 RG", "2 w", "72 620 m", "540 620 l", "S");

  const notice = wrap(
    "This is a demonstration document from a fictional municipal website built as a portfolio example. It is not issued by any government agency and has no legal effect.",
    78,
  );
  body.push("BT", "/F2 11 Tf", "72 590 Td", "16 TL");
  notice.forEach((line, index) => {
    body.push(index === 0 ? `(${pdfString(line)}) Tj` : `T* (${pdfString(line)}) Tj`);
  });
  body.push("ET");

  const stream = body.join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R /Lang (en-US) /MarkInfo << /Marked true >> >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>",
    `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    `<< /Title (${pdfString(title)}) /Author (City of Bellwood Department of Public Works) /Creator (Bellwood Public Works demonstration site) >>`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}

async function main() {
  try {
    await stat(outDir);
  } catch {
    console.error("No out/ directory. Run the build first.");
    process.exit(1);
  }

  // Collect every distinct document path, with the link text as its title.
  const documents = new Map();
  for await (const file of walk(outDir)) {
    if (!file.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    for (const match of html.matchAll(LINK_PATTERN)) {
      const [, href, label] = match;
      const path = href.slice(href.indexOf("/documents/"));
      const title = label.trim();
      if (title && (!documents.has(path) || documents.get(path).length < title.length)) {
        documents.set(path, title);
      } else if (!documents.has(path)) {
        documents.set(path, path.split("/").pop());
      }
    }
  }

  if (documents.size === 0) {
    console.warn("No document links found in out/. Nothing generated.");
    return;
  }

  for (const [path, title] of documents) {
    const subtitle = path.includes("/forms/") ? "Form" : "Meeting document";
    const pdf = buildPdf(title, subtitle);
    for (const root of [outDir, publicDir]) {
      const target = join(root, path.replace(/^\//, ""));
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, pdf);
    }
  }

  console.log(`Generated ${documents.size} documents into ${relative(process.cwd(), outDir)}/documents and public/documents`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
