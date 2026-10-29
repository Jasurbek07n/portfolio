/**
 * A static server for `out/` that behaves like Vercel does.
 *
 * Next's export writes its RSC prefetch payloads as nested directories —
 *   out/uz/__next.$d$lang/__PAGE__.txt
 * — while the client asks for them dot-flattened:
 *   /uz/__next.$d$lang.__PAGE__.txt
 *
 * Vercel maps between the two. A naive file server cannot, so every page
 * logs three 404s and React can report a hydration error (#418) on the first
 * load. Those are artifacts of the server, not of the site, and they made
 * local QA disagree with production. This resolves the flattened form so the
 * harness tests what visitors actually get.
 *
 *   node lab/serve.mjs [port] [dir]
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.argv[2] || 8099);
const ROOT = process.argv[3] || "out";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

/** Candidate on-disk paths for one request path, in order of preference. */
function candidates(urlPath) {
  const out = [];
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  out.push(join(ROOT, clean));
  if (clean.endsWith("/")) out.push(join(ROOT, clean, "index.html"));
  else out.push(join(ROOT, clean + "/index.html"), join(ROOT, clean + ".html"));

  // The dot-flattened RSC payload: turn the dots after "__next." back into
  // directory separators, which is where the export actually wrote the file.
  const i = clean.indexOf("__next.");
  if (i !== -1 && clean.endsWith(".txt")) {
    const head = clean.slice(0, i);
    const tail = clean.slice(i + "__next.".length, -".txt".length);
    out.push(join(ROOT, head, "__next." + tail.split(".").join("/") + ".txt"));
  }
  return out;
}

createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];

  // `/` is a redirect on Vercel too, via vercel.json.
  if (urlPath === "/") {
    res.writeHead(307, { Location: "/uz/" });
    return res.end();
  }

  for (const file of candidates(urlPath)) {
    if (existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, {
        "content-type": TYPES[extname(file)] || "application/octet-stream",
        "cache-control": "no-store",
      });
      return createReadStream(file).pipe(res);
    }
  }

  res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  res.end("404");
}).listen(PORT, "127.0.0.1", () => {
  console.log(`serving ${ROOT} on http://127.0.0.1:${PORT} (Vercel-like)`);
});
