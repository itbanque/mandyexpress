"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { localeHref } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import LangSwitcher from "./LangSwitcher";
import QuoteButton from "./QuoteButton";

const navItems = ["home", "services", "fleet", "route", "about", "contact"] as const;

export type NavKey = (typeof navItems)[number];

const navPaths: Record<NavKey, string> = {
  home: "/",
  services: "/services",
  fleet: "/fleet",
  route: "/route",
  about: "/about",
  contact: "/contact"
};

type HeaderProps = {
  activeItem?: NavKey;
};

export default function Header({ activeItem = "home" }: HeaderProps) {
  const { locale, dict } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 bg-white shadow-header">
      <div className="container header-inner">
        <Link href={localeHref(locale, "/")} aria-label={dict.header.homeAria} className="mobile-logo-link shrink-0">
          <Image
            src="/images/mandy-express-logo.png"
            alt="Mandy Express"
            width={236}
            height={90}
            priority
            className="header-logo h-auto w-[205px] md:w-[236px]"
          />
        </Link>

        <nav className="desktop-nav" aria-label={dict.header.primaryNav}>
          {navItems.map((item) => (
            <Link
              href={localeHref(locale, navPaths[item])}
              key={item}
              className={`nav-link ${item === activeItem ? "nav-link-active" : ""}`}
            >
              {dict.nav[item]}
            </Link>
          ))}
        </nav>

        <LangSwitcher className="lang-switch desktop-lang-switch" />

        <QuoteButton className="desktop-quote-button" />

        <QuoteButton className="header-quote-button mobile-header-quote" />

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={isMenuOpen ? dict.header.closeMenu : dict.header.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={25} strokeWidth={3} /> : <Menu size={25} strokeWidth={3} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="mobile-nav-panel" aria-label={dict.header.mobileNav}>
          {navItems.map((item) => (
            <Link
              href={localeHref(locale, navPaths[item])}
              key={item}
              className={`mobile-nav-link ${item === activeItem ? "mobile-nav-link-active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {dict.nav[item]}
            </Link>
          ))}
          <LangSwitcher className="mobile-nav-link mobile-lang-switch" full onNavigate={() => setIsMenuOpen(false)} />
        </nav>
      )}
    </header>
  );
}
