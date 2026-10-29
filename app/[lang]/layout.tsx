import type { Metadata, Viewport } from "next";
import { LANGS, LANG_TAG, toLang } from "@/lib/i18n";
import { profile, ui } from "@/content/site";
import { NO_FLASH } from "@/components/theme";
import "../globals.css";

/* This is the root layout. There is no `app/layout.tsx`: every page lives
   under `/[lang]`, which is what lets `<html lang>` be correct per language
   instead of being hardcoded once for all three. */

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return {
    title: `${profile.name} — ${profile.role[lang]}`,
    description: profile.intro[lang],
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111210" },
    { media: "(prefers-color-scheme: light)", color: "#F7F5EF" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = toLang((await params).lang);
  return (
    <html lang={LANG_TAG[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        {/* Reveals start at opacity:0, so a blocked bundle would render an
            empty page. This is the floor under the animation layer. */}
        <noscript>
          <style>{`.rv{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip">
          {ui.skip[lang]}
        </a>
        {children}
      </body>
    </html>
  );
}
