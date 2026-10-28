/**
 * Everything on this site lives under /<lang>/, so the site root needs to send
 * people somewhere. This writes two things into the build:
 *
 *   out/index.html   a meta-refresh to /uz/, which also works from file://
 *   out/_redirects   the same thing server-side, for Netlify
 *
 * Both exist because the meta refresh is the only thing that works when the
 * folder is opened from disk, and the Netlify rule is the only one that gives
 * a real 302 instead of a flash of blank page.
 */
import { writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const DEFAULT = "uz";
const LANGS = ["uz", "ru", "en"];

if (!existsSync(OUT)) {
  console.error(`postbuild: no ${OUT}/ directory — did the build run?`);
  process.exit(1);
}

for (const l of LANGS) {
  if (!existsSync(join(OUT, l, "index.html"))) {
    console.error(`postbuild: expected ${OUT}/${l}/index.html, it is missing`);
    process.exit(1);
  }
}

writeFileSync(
  join(OUT, "index.html"),
  `<!doctype html>
<html lang="${DEFAULT}">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=./${DEFAULT}/">
<link rel="canonical" href="./${DEFAULT}/">
<title>Jasurbek Nematov</title>
</head>
<body><a href="./${DEFAULT}/">Jasurbek Nematov</a></body>
</html>
`,
);

writeFileSync(
  join(OUT, "_redirects"),
  `/            /${DEFAULT}/   302
/index.html  /${DEFAULT}/   302
`,
);

console.log(
  `postbuild: root redirect -> /${DEFAULT}/  ·  ${readdirSync(OUT).length} entries in ${OUT}/`,
);
