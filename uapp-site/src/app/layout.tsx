import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "UAPP — Engineering for regulated finance",
  description:
    "Payments-grade engineering for banks and fintechs. Banking first, crypto where you need it.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-body antialiased">
        {children}
      </body>
    </html>
  );
}

