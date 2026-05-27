import type { Metadata } from "next";
import { Noto_Sans_Tamil, Fraunces } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./language-provider";

// Primary Tamil typeface (also covers Latin body text), as --font-noto-tamil.
const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Editorial display serif for Latin headlines, as --font-fraunces. Tamil
// headlines fall back to Noto Sans Tamil via the font stack.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Career Guidance Workshop 2026 | JKKN Institutions · CDC · Yi",
  description:
    "A free career guidance workshop for Class 12 students and parents in Edappadi — Tamil Nadu college admissions, course selection, and AI-driven careers. 12 June 2026, 10:30 AM, Edappadi Community Hall.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ta"
      className={`${notoTamil.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
