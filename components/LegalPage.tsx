import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import Footer from "./Footer";
import Header from "./Header";
import QuoteModal from "./QuoteModal";
import type { Locale } from "@/lib/i18n";

// Shared layout for the legal pages (privacy policy, terms). Both dictionaries
// expose the same shape, so the markup lives here and each page only supplies content.
type LegalContent = {
  heroAria: string;
  eyebrow: string;
  title: string;
  intro: string[];
  effectiveLabel: string;
  effectiveDate: string;
  updatedLabel: string;
  updatedDate: string;
  tocHeading: string;
  tocAria: string;
  sections: {
    title: string;
    body: string[];
    groups: { heading: string; items: { term: string; text: string }[] }[];
  }[];
  contact: {
    title: string;
    body: string;
    office: string;
    legalName: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;
    areasLabel: string;
    areas: string;
    addressLabel: string;
    addressLines: string[];
  };
};

type LegalPageProps = {
  locale: Locale;
  idPrefix: string;
  content: LegalContent;
};

export default function LegalPage({ locale, idPrefix, content }: LegalPageProps) {
  const sectionId = (index: number) => `${idPrefix}-section-${index + 1}`;
  const contactId = `${idPrefix}-contact`;
  const { contact } = content;

  const contactRows = [
    { icon: Mail, label: contact.emailLabel, value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: Phone,
      label: contact.phoneLabel,
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\D/g, "")}`
    },
    { icon: Globe2, label: contact.areasLabel, value: contact.areas },
    { icon: MapPin, label: contact.addressLabel, value: contact.addressLines.join(", ") }
  ];

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header />

      <section className="legal-hero" aria-label={content.heroAria}>
        <div className="container legal-hero-inner">
          <p className="legal-eyebrow">{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <span className="legal-orange-rule" />
          {content.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="legal-dates">
            <span>
              <strong>{content.effectiveLabel}</strong>
              {content.effectiveDate}
            </span>
            <span>
              <strong>{content.updatedLabel}</strong>
              {content.updatedDate}
            </span>
          </div>
        </div>
      </section>

      <div className="container legal-layout">
        <nav className="legal-toc" aria-label={content.tocAria}>
          <h2>{content.tocHeading}</h2>
          <ul>
            {content.sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#${sectionId(index)}`}>{section.title}</a>
              </li>
            ))}
            <li>
              <a href={`#${contactId}`}>{contact.title}</a>
            </li>
          </ul>
        </nav>

        <article className="legal-content">
          {content.sections.map((section, index) => (
            <section className="legal-section" id={sectionId(index)} key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.groups.map((group) => (
                <div className="legal-group" key={group.heading || group.items[0].term}>
                  {group.heading ? <h3>{group.heading}</h3> : null}
                  <ul className="legal-list">
                    {group.items.map((item) => (
                      <li key={item.term}>
                        <strong>{item.term}</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          <section className="legal-section" id={contactId}>
            <h2>{contact.title}</h2>
            <p>{contact.body}</p>
            <div className="legal-contact-card">
              <p className="legal-contact-office">{contact.office}</p>
              <p className="legal-contact-legal">{contact.legalName}</p>
              <div className="legal-contact-rows">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div className="legal-contact-row" key={row.label}>
                      <Icon size={20} strokeWidth={2.1} />
                      <span>
                        <strong>{row.label}</strong>
                        {row.href ? <a href={row.href}>{row.value}</a> : <span>{row.value}</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </article>
      </div>

      <Footer locale={locale} />
      <QuoteModal />
    </main>
  );
}
