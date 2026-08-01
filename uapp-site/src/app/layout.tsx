import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

/**
 * Мандатні гарнітури брендбуку (docs/concept-research.md розд. 2).
 * Возимо тільки ті ваги, які використовує DESIGN.md: 400 і 500.
 * Джерела .otf лежать у public/fonts/ — тут працюють woff2-похідні.
 */
const eUkraineHead = localFont({
  src: [
    { path: "../fonts/eUkraineHead-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/eUkraineHead-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-e-ukraine-head",
  display: "swap",
});

const eUkraine = localFont({
  src: [
    { path: "../fonts/eUkraine-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/eUkraine-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-e-ukraine",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UAPP — Engineering for regulated finance",
  description:
    "Payments-grade engineering for banks and fintechs. Banking first, crypto where you need it.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${eUkraineHead.variable} ${eUkraine.variable}`}>
      <body className="bg-background text-foreground font-body antialiased">
        {children}
      </body>
    </html>
  );
}
