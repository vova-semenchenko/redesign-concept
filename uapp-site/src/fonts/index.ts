import localFont from "next/font/local";

/**
 * e-Ukraine Head / e-Ukraine — mandated by the client brand book
 * (docs/brand-style-guide.md §2). Source OTFs live in `public/fonts/`;
 * these WOFF2 builds are what ships.
 *
 * Head carries 300/400/500, body 400/500 — the system needs no more,
 * because hierarchy is built from weight *pairs*, not from a weight ramp.
 */

export const eUkraineHead = localFont({
  src: [
    { path: "./e-UkraineHead-Light.woff2", weight: "300", style: "normal" },
    { path: "./e-UkraineHead-Regular.woff2", weight: "400", style: "normal" },
    { path: "./e-UkraineHead-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-head-loaded",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const eUkraine = localFont({
  src: [
    { path: "./e-Ukraine-Regular.woff2", weight: "400", style: "normal" },
    { path: "./e-Ukraine-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body-loaded",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
