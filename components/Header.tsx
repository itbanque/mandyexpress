"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QuoteButton from "./QuoteButton";

const navItems = ["Home", "Services", "Fleet", "Route", "About Us", "Contact"];

const navLinks: Record<string, string> = {
  Home: "/",
  Services: "/services",
  Fleet: "/fleet",
  Route: "/route",
  "About Us": "/about",
  Contact: "/contact"
};

type HeaderProps = {
  activeItem?: string;
};

export default function Header({ activeItem = "Home" }: HeaderProps) {
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
        <Link href="/" aria-label="Mandy Express home" className="mobile-logo-link shrink-0">
          <Image
            src="/images/mandy-express-logo.png"
            alt="Mandy Express"
            width={236}
            height={90}
            priority
            className="header-logo h-auto w-[205px] md:w-[236px]"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              href={navLinks[item]}
              key={item}
              className={`nav-link ${item === activeItem ? "nav-link-active" : ""}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <QuoteButton className="desktop-quote-button" />

        <QuoteButton className="header-quote-button mobile-header-quote" />

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={25} strokeWidth={3} /> : <Menu size={25} strokeWidth={3} />}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="mobile-nav-panel" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              href={navLinks[item]}
              key={item}
              className={`mobile-nav-link ${item === activeItem ? "mobile-nav-link-active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
