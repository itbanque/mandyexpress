import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, Phone } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import QuoteButton from "./QuoteButton";

const quickLinkPaths = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "fleet", href: "/fleet" },
  { key: "route", href: "/route" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" }
] as const;

export default async function Footer({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const footer = dict.footer;

  return (
    <footer id="contact" className="bg-mandy-navy text-white">
      <div className="footer-cta-bar">
        <div className="container footer-cta-inner">
          <div className="footer-cta-intro">
            <span className="contact-round"><Phone size={32} /></span>
            <div>
              <p className="footer-cta-title">{footer.ctaTitle}</p>
              <p className="footer-small">{footer.ctaLine1}</p>
              <p className="footer-small">{footer.ctaLine2}</p>
            </div>
          </div>
          <a href="tel:5146235486" className="footer-contact"><Phone size={24} />514-623-5486</a>
          <a href="mailto:info@mandyexpress.ca" className="footer-contact"><Mail size={25} />info@mandyexpress.ca</a>
          <a href="https://mandyexpress.ca" className="footer-contact"><Globe2 size={24} />mandyexpress.ca</a>
          <QuoteButton className="footer-quote-button inline-flex" />
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-brand">
          <Image
            src="/images/mandy-express-logo-footer.png"
            alt="Mandy Express"
            width={220}
            height={84}
            className="footer-logo"
          />
          <p className="footer-tagline">{footer.tagline}</p>
          <p className="footer-copyright">{footer.copyright}</p>
        </div>

        <div className="footer-links">
          <h2 className="footer-heading">{footer.quickLinks}</h2>
          <ul className="footer-link-list">
            {quickLinkPaths.map((item) => (
              <li key={item.key}>
                <Link href={localeHref(locale, item.href)} className="hover:text-mandy-orange">
                  {dict.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact-column">
          <h2 className="footer-heading">{footer.contactUs}</h2>
          <div className="footer-contact-list">
            <a href="tel:5146235486" className="footer-list-contact"><Phone size={18} />514-623-5486</a>
            <a href="mailto:info@mandyexpress.ca" className="footer-list-contact"><Mail size={18} />info@mandyexpress.ca</a>
            <a href="https://mandyexpress.ca" className="footer-list-contact"><Globe2 size={18} />mandyexpress.ca</a>
          </div>
          <div className="footer-legal">
            <Link href="#privacy" className="hover:text-mandy-orange">{footer.privacy}</Link>
            <span className="text-white/35">|</span>
            <Link href="#terms" className="hover:text-mandy-orange">{footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
