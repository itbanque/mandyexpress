"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";

type LangSwitcherProps = {
  className?: string;
  full?: boolean;
  onNavigate?: () => void;
};

export default function LangSwitcher({ className = "", full = false, onNavigate }: LangSwitcherProps) {
  const { locale, dict } = useI18n();
  const pathname = usePathname() || "/";
  const targetLocale = locale === "fr" ? "en" : "fr";
  // During prerender the path carries the internal /en prefix; strip any
  // locale prefix before building the target URL.
  const basePath = pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";
  const targetPath = targetLocale === "fr" ? (basePath === "/" ? "/fr" : `/fr${basePath}`) : basePath;

  const rememberChoice = () => {
    document.cookie = `${LOCALE_COOKIE}=${targetLocale}; path=/; max-age=31536000; samesite=lax`;
    onNavigate?.();
  };

  return (
    <Link
      href={targetPath}
      className={className}
      onClick={rememberChoice}
      aria-label={dict.langSwitcher.ariaLabel}
      lang={targetLocale}
    >
      {full ? dict.langSwitcher.full : dict.langSwitcher.short}
    </Link>
  );
}
