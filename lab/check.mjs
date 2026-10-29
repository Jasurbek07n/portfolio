/**
 * QA harness for the built site.
 *
 * Checks, for every page type in every language, across four theme modes
 * (OS-light, OS-dark, toggled-light, toggled-dark):
 *
 *   - WCAG AA contrast on every text node, with the foreground composited
 *     over the real painted background rather than read naively
 *   - the theme that actually applied matches the one requested
 *   - no horizontal overflow (the marquee is exempt — it runs off-screen by
 *     design)
 *   - exactly one <h1>, correct <html lang>
 *   - every image decodes, including lazy ones below the fold
 *   - no console errors
 *   - no markdown markup leaked into rendered text
 *   - no reveal left stuck at opacity 0
 *
 * ...and then, with JavaScript disabled, that the <noscript> rule still
 * leaves every reveal visible, so a failed bundle cannot produce a blank
 * page.
 *
 * Usage: serve `out/` on :8099, then run with playwright-core available:
 *   CHROME=<path-to-chrome> SHOTS=<dir> node lab/check.mjs
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE || "http://127.0.0.1:8099";
const OUT = process.env.SHOTS || "./lab/shots";
mkdirSync(OUT, { recursive: true });

const pages = [
  ["/uz/", "uz-home"],
  ["/ru/", "ru-home"],
  ["/en/", "en-home"],
  ["/uz/projects/belt-tech/", "uz-belt"],
  ["/ru/projects/mountain-calendar/", "ru-mountain"],
  ["/en/projects/payment-tracking/", "en-pay"],
  ["/uz/projects/daily-ops/", "uz-dops"],
  ["/en/projects/agent-pipeline/", "en-agents"],
];

const modes = [
  { theme: "light", forced: null, tag: "media-light" },
  { theme: "dark", forced: null, tag: "media-dark" },
  { theme: "light", forced: "dark", tag: "forced-dark" },
  { theme: "dark", forced: "light", tag: "forced-light" },
];

const srgb = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const lum = ([r, g, b]) =>
  0.2126 * srgb(r / 255) + 0.7152 * srgb(g / 255) + 0.0722 * srgb(b / 255);
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const b = await chromium.launch({ executablePath: process.env.CHROME });
let fails = 0;

for (const mode of modes) {
  for (const [path, name] of pages) {
    const ctx = await b.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: mode.theme,
    });
    if (mode.forced) {
      await ctx.addInitScript((t) => {
        try {
          localStorage.setItem("theme", t);
        } catch {}
      }, mode.forced);
    }
    const p = await ctx.newPage();
    const errs = [];
    const bad = [];
    // A console "Failed to load resource" carries no URL, so failed requests
    // are tracked from the response side where the path is visible.
    p.on("console", (m) => {
      if (m.type() !== "error") return;
      if (/Failed to load resource/i.test(m.text())) return;
      errs.push(m.text());
    });
    p.on("pageerror", (e) => errs.push(String(e)));
    p.on("response", (r) => {
      if (r.status() < 400) return;
      bad.push(`${r.status()} ${r.url()}`);
    });

    const resp = await p.goto(BASE + path, { waitUntil: "networkidle" });
    if (resp.status() !== 200) {
      console.log(`FAIL ${mode.tag} ${path} -> ${resp.status()}`);
      fails++;
    }

    const applied = await p.evaluate(() => ({
      set: document.documentElement.getAttribute("data-theme"),
      bg: getComputedStyle(document.body).backgroundColor,
    }));
    const wantDark = mode.forced ? mode.forced === "dark" : mode.theme === "dark";
    if (wantDark !== applied.bg.includes("17, 18, 16")) {
      console.log(`FAIL theme ${mode.tag} ${path} bg=${applied.bg} data-theme=${applied.set}`);
      fails++;
    }

    // Walk the page so lazy images are requested. The site sets
    // scroll-behavior: smooth, which makes a stepped programmatic scroll
    // never arrive, so it is switched off for the walk.
    await p.evaluate(async () => {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 130));
      }
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = prev;
    });
    await p.waitForTimeout(1800);

    const info = await p.evaluate(() => {
      const toRGB = (s) => (s.match(/\d+(\.\d+)?/g) || []).slice(0, 4).map(Number);
      const over = (a, bg) => {
        const al = a.length === 4 ? a[3] : 1;
        return [0, 1, 2].map((i) => Math.round(a[i] * al + bg[i] * (1 - al)));
      };
      const bodyBg = toRGB(getComputedStyle(document.body).backgroundColor).slice(0, 3);
      const samples = [];
      for (const el of document.querySelectorAll(
        "p,h1,h2,h3,li,dd,dt,a,span,figcaption,b,code,em,button,blockquote",
      )) {
        const t = (el.textContent || "").trim();
        if (!t || el.children.length) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0") continue;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        let n = el,
          bg = null;
        while (n && n !== document.documentElement) {
          const c = toRGB(getComputedStyle(n).backgroundColor);
          if (c.length >= 3 && (c.length < 4 || c[3] > 0)) {
            bg = over(c, bodyBg);
            break;
          }
          n = n.parentElement;
        }
        samples.push({
          fg: over(toRGB(cs.color), bg || bodyBg),
          bg: bg || bodyBg,
          size: parseFloat(cs.fontSize),
          weight: Number(cs.fontWeight) || 400,
          text: t.slice(0, 44),
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 24),
        });
      }
      const docW = document.documentElement.clientWidth;
      const wide = [];
      for (const el of document.querySelectorAll("*")) {
        if (el.closest(".marquee")) continue;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > docW + 1 || r.left < -1)) {
          wide.push(el.tagName.toLowerCase() + "." + (el.className || "").toString().slice(0, 26));
        }
      }
      return {
        samples,
        overflow: [...new Set(wide)].slice(0, 6),
        scrollW: document.documentElement.scrollWidth,
        clientW: docW,
        langAttr: document.documentElement.lang,
        imgs: [...document.images].map((i) => ({
          src: i.currentSrc || i.src,
          ok: i.complete && i.naturalWidth > 0,
        })),
        h1: document.querySelectorAll("h1").length,
        // A lone * is legitimate content (console.*); only a bare backtick
        // or a ** pair means markup leaked through.
        ticks: (document.body.innerText.match(/`|\*\*/g) || []).length,
        hidden: [...document.querySelectorAll(".rv")].filter(
          (e) => !e.classList.contains("is-in"),
        ).length,
      };
    });

    for (const s of info.samples) {
      const big = s.size >= 24 || (s.size >= 18.66 && s.weight >= 700);
      const need = big ? 3 : 4.5;
      const r = ratio(s.fg, s.bg);
      if (r < need) {
        console.log(
          `FAIL contrast ${mode.tag} ${path} ${r.toFixed(2)}:1 (need ${need}) <${s.tag}.${s.cls}> "${s.text}"`,
        );
        fails++;
      }
    }
    if (info.scrollW > info.clientW + 1) {
      console.log(`FAIL overflow ${mode.tag} ${path}`, info.scrollW, info.clientW, info.overflow);
      fails++;
    }
    if (info.h1 !== 1) {
      console.log(`FAIL h1 ${mode.tag} ${path} = ${info.h1}`);
      fails++;
    }
    const broken = info.imgs.filter((i) => !i.ok);
    if (broken.length) {
      console.log(`FAIL images ${mode.tag} ${path}`, broken.map((i) => i.src));
      fails++;
    }
    if (errs.length) {
      console.log(`FAIL console ${mode.tag} ${path}`, errs.slice(0, 3));
      fails++;
    }
    if (bad.length) {
      console.log(`FAIL requests ${mode.tag} ${path}`, [...new Set(bad)].slice(0, 5));
      fails++;
    }
    if (info.ticks) {
      console.log(`FAIL stray markup ${mode.tag} ${path} = ${info.ticks}`);
      fails++;
    }
    if (info.hidden) {
      console.log(`FAIL unrevealed ${mode.tag} ${path} = ${info.hidden} still hidden`);
      fails++;
    }

    if (mode.tag === "media-light") {
      console.log(
        `ok ${path.padEnd(34)} lang=${info.langAttr} imgs=${info.imgs.length} samples=${info.samples.length}`,
      );
      await p.screenshot({ path: `${OUT}/${name}.png` });
    }
    await ctx.close();
  }
}

{
  const ctx = await b.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1280, height: 900 },
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/uz/", { waitUntil: "domcontentloaded" });
  const [shown, total] = (
    await p.evaluate(() => {
      const els = [...document.querySelectorAll(".rv")];
      return els.filter((e) => getComputedStyle(e).opacity !== "0").length + "/" + els.length;
    })
  )
    .split("/")
    .map(Number);
  if (total === 0 || shown !== total) {
    console.log(`FAIL no-JS: only ${shown}/${total} reveals visible`);
    fails++;
  } else {
    console.log(`ok no-JS fallback: ${shown}/${total} reveals visible`);
  }
  await ctx.close();
}

await b.close();
console.log(fails === 0 ? "\nALL CHECKS PASSED" : `\n${fails} FAILURES`);
process.exit(fails === 0 ? 0 : 1);
