export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeHref(locale: Locale, path: string) {
  if (locale === "fr") {
    return path === "/" ? "/fr" : `/fr${path}`;
  }

  return path;
}

export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: localeHref(locale, path),
    languages: {
      "en-CA": localeHref("en", path),
      "fr-CA": localeHref("fr", path),
      "x-default": localeHref("en", path)
    }
  };
}
