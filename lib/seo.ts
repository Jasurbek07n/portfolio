import type { Metadata } from "next";
import { LANGS, LANG_TAG, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/content/site";

/**
 * Canonical + hreflang for one page, in all three languages.
 *
 * `path` is everything after the language, with a trailing slash — "/" for a
 * home page, "/projects/daily-ops/" for a project. The site is built with
 * `trailingSlash: true`, so these have to match the real URLs exactly or the
 * canonical points at a redirect.
 *
 * x-default goes to Uzbek because that is what `/` redirects to.
 */
export function alternates(lang: Lang, path: string): Metadata["alternates"] {
  const url = (l: Lang) => `${SITE_URL}/${l}${path}`;
  return {
    canonical: url(lang),
    languages: {
      ...Object.fromEntries(LANGS.map((l) => [LANG_TAG[l], url(l)])),
      "x-default": url("uz"),
    },
  };
}

const OG_LOCALE: Record<Lang, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

/** The card shown when the link is pasted into LinkedIn, Telegram or X. */
export function social(
  lang: Lang,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = `${SITE_URL}/${lang}${path}`;
  const image = `${SITE_URL}/og.png`;
  return {
    openGraph: {
      type: "website",
      url,
      siteName: "Jasurbek Nematov",
      title,
      description,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
