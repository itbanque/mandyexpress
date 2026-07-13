import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
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
  return (
    <header className="sticky top-0 z-50 bg-white shadow-header">
      <div className="container header-inner">
        <Link href="/" aria-label="Mandy Express home" className="shrink-0">
          <Image
            src="/images/mandy-express-logo.png"
            alt="Mandy Express"
            width={236}
            height={90}
            priority
            className="h-auto w-[205px] md:w-[236px]"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary navigation">
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

        <QuoteButton className="hidden lg:inline-flex" />

        <button className="grid h-12 w-12 place-items-center rounded bg-mandy-orange text-white lg:hidden" aria-label="Open menu">
          <Menu size={25} strokeWidth={3} />
        </button>
      </div>
    </header>
  );
}
