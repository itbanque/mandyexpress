import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, Phone } from "lucide-react";
import QuoteButton from "./QuoteButton";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Fleet", href: "/fleet" },
  { label: "Route", href: "/route" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-mandy-navy text-white">
      <div className="footer-cta-bar">
        <div className="container footer-cta-inner">
          <div className="footer-cta-intro">
            <span className="contact-round"><Phone size={32} /></span>
            <div>
              <p className="footer-cta-title">Ready to ship today?</p>
              <p className="footer-small">Let&apos;s move your freight.</p>
              <p className="footer-small">Call, email, or request a quote today.</p>
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
          <p className="footer-tagline">More Than Cargo. Your Trust, Our Priority.</p>
          <p className="footer-copyright">© 2024 Mandy Express Freight Service. All Rights Reserved.</p>
        </div>

        <div className="footer-links">
          <h2 className="footer-heading">Quick Links</h2>
          <ul className="footer-link-list">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-mandy-orange">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-contact-column">
          <h2 className="footer-heading">Contact Us</h2>
          <div className="footer-contact-list">
            <a href="tel:5146235486" className="footer-list-contact"><Phone size={18} />514-623-5486</a>
            <a href="mailto:info@mandyexpress.ca" className="footer-list-contact"><Mail size={18} />info@mandyexpress.ca</a>
            <a href="https://mandyexpress.ca" className="footer-list-contact"><Globe2 size={18} />mandyexpress.ca</a>
          </div>
          <div className="footer-legal">
            <Link href="#privacy" className="hover:text-mandy-orange">Privacy Policy</Link>
            <span className="text-white/35">|</span>
            <Link href="#terms" className="hover:text-mandy-orange">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
