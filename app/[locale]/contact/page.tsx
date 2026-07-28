import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, Globe2, Mail, MapPin, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteModal from "@/components/QuoteModal";
import ContactForm from "./ContactForm";
import { localeFromParams } from "@/lib/dictionaries";
import { pageAlternates } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, dict } = await localeFromParams(params);

  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
    alternates: pageAlternates(locale, "/contact")
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);
  const t = dict.contactPage;

  const contactItems = [
    {
      icon: Phone,
      label: t.phone,
      value: "438-921-7268",
      href: "tel:4389217268"
    },
    {
      icon: Mail,
      label: t.email,
      value: "info@mandyexpress.ca",
      href: "mailto:info@mandyexpress.ca"
    },
    {
      icon: Globe2,
      label: t.website,
      value: "mandyexpress.ca",
      href: "https://mandyexpress.ca"
    },
    {
      icon: MapPin,
      label: t.office,
      value: t.officeLines
    },
    {
      icon: Clock3,
      label: t.hours,
      value: t.hoursLines
    }
  ];

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="contact" />

      <section className="container contact-hero" aria-label={t.heroAria}>
        <Image
          src="/images/fleet-hero-v2.png"
          alt=""
          width={1380}
          height={497}
          priority
          className="contact-hero-image"
        />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-copy">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <span />
        </div>
      </section>

      <section className="container contact-main-section" aria-label={t.mainAria}>
        <aside className="contact-info-panel">
          <div className="contact-section-heading">
            <h2>{t.infoHeading}</h2>
            <span />
          </div>

          <div className="contact-info-list">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="contact-info-icon">
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <span>
                      {Array.isArray(item.value)
                        ? item.value.map((line) => <span key={line}>{line}</span>)
                        : item.value}
                    </span>
                  </span>
                </>
              );

              return item.href ? (
                <a href={item.href} className="contact-info-item" key={item.label}>
                  {content}
                </a>
              ) : (
                <div className="contact-info-item" key={item.label}>
                  {content}
                </div>
              );
            })}
          </div>
        </aside>

        <section className="contact-form-panel" aria-labelledby="contact-form-heading">
          <div className="contact-section-heading">
            <h2 id="contact-form-heading">{t.formHeading}</h2>
            <span />
          </div>
          <ContactForm />
        </section>
      </section>

      <Footer locale={locale} />
      <QuoteModal />
    </main>
  );
}
