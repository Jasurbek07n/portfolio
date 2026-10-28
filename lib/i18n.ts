export const LANGS = ["uz", "ru", "en"] as const;

export type Lang = (typeof LANGS)[number];

/** The default. The site root redirects here. */
export const DEFAULT_LANG: Lang = "uz";

/** A string in every language. Making this a Record means a missing
 *  translation is a type error rather than an empty paragraph on the page. */
export type T = Record<Lang, string>;

/** A list of strings in every language. */
export type TL = Record<Lang, string[]>;

export const LANG_LABEL: Record<Lang, string> = {
  uz: "O‘zbekcha",
  ru: "Русский",
  en: "English",
};

/** Short form for the switcher. */
export const LANG_SHORT: Record<Lang, string> = { uz: "UZ", ru: "RU", en: "EN" };

/** The `lang` attribute value. */
export const LANG_TAG: Record<Lang, string> = {
  uz: "uz-Latn",
  ru: "ru",
  en: "en",
};

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}
