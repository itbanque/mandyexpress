import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "./en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en").then((module) => module.en),
  fr: () => import("./fr").then((module) => module.fr)
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export async function localeFromParams(params: Promise<{ locale: string }>) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return { locale, dict };
}

export type { Dictionary };
