#!/usr/bin/env node
// contact-sheet.mjs — screenshot an in-page SVG animation at frozen timestamps.
//
//   node contact-sheet.mjs --url http://localhost:3000/ \
//     --selector ".flow-diagram" --at 0,0.6,1.4,2.4,3.6,5,6 \
//     [--class is-playing] [--out ./.motion-snapshots] [--width 1440] [--height 900]
//     [--reduced-motion] [--theme dark]
//
// Requires: npm i -D playwright && npx playwright install chromium
//
// Every animation in the subtree is paused and seeked to t (timeline-absolute, so
// animation-delay is included). One PNG per timestamp, clipped to the selector.

import { mkdir } from "node:fs/promises";
import path from "node:path";

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const flag = (name) => argv.includes(`--${name}`);

const url = arg("url");
const selector = arg("selector", "svg");
const triggerClass = arg("class", "is-playing");
const outDir = arg("out", "./.motion-snapshots");
const width = Number(arg("width", 1440));
const height = Number(arg("height", 900));
const theme = arg("theme"); // e.g. "dark" → sets data-theme on <html>
const times = String(arg("at", "0,1,2,3"))
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => Number.isFinite(n));

if (!url) {
  console.error("--url is required");
  process.exit(1);
}

const { chromium } = await import("playwright").catch(() => {
  console.error("playwright not installed: npm i -D playwright && npx playwright install chromium");
  process.exit(1);
});

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  reducedMotion: flag("reduced-motion") ? "reduce" : "no-preference",
  deviceScaleFactor: 2,
});
const page = await context.newPage();

for (const t of times) {
  await page.goto(url, { waitUntil: "networkidle" });

  if (theme) {
    await page.evaluate((th) => document.documentElement.setAttribute("data-theme", th), theme);
  }

  const target = page.locator(selector).first();
  await target.waitFor({ state: "attached" });
  await target.scrollIntoViewIfNeeded();

  // Apply the trigger, let the animations get created, then seek them all.
  await page.evaluate(
    ({ sel, cls, at }) => {
      const root = document.querySelector(sel);
      if (!root) throw new Error(`selector not found: ${sel}`);
      root.classList.add(cls);
      return new Promise((resolve) =>
        requestAnimationFrame(() => {
          const anims = document.getAnimations({ subtree: true });
          for (const a of anims) {
            a.pause();
            try {
              a.currentTime = at * 1000;
            } catch {
              /* animation not seekable (e.g. scroll timeline) — leave it */
            }
          }
          requestAnimationFrame(() => resolve(anims.length));
        }),
      );
    },
    { sel: selector, cls: triggerClass, at: t },
  );

  const file = path.join(outDir, `t-${String(t).replace(".", "_")}s.png`);
  await target.screenshot({ path: file });
  console.log(`${file}  (t=${t}s)`);
}

await browser.close();
console.log(`\n${times.length} frames in ${outDir} — open them and read them.`);
