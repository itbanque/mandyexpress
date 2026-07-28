import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Check, Handshake, Minus, Route, ShieldCheck, Truck } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteButton from "@/components/QuoteButton";
import QuoteModal from "@/components/QuoteModal";
import { localeFromParams } from "@/lib/dictionaries";
import { localeHref, pageAlternates } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, dict } = await localeFromParams(params);

  return {
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    alternates: pageAlternates(locale, "/about")
  };
}

const guaranteeIcons = [Route, Truck, BadgeCheck, ShieldCheck];

// The bento grid alternates a wide and a narrow card per row; the fleet card
// (index 1) is the one that carries the photo.
const guaranteeSpans = ["abt-card-wide", "abt-card-narrow abt-card-media", "abt-card-narrow", "abt-card-wide"];

export default async function AboutPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);
  const t = dict.aboutPage;

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="about" />

      <section className="abt-hero" aria-label={t.heroAria}>
        <Image
          src="/images/fleet-hero-v2.png"
          alt={t.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="abt-hero-image"
        />
        <div className="abt-hero-overlay" aria-hidden="true" />
        <div className="abt-hero-inner">
          <p className="abt-eyebrow">{t.eyebrow}</p>
          <h1>
            {t.heroTitleLines[0]}
            <br />
            {t.heroTitleLines[1]} <span>{t.heroAccent}</span>
          </h1>
          <p className="abt-hero-lead">{t.heroLead}</p>
          <div className="abt-hero-actions">
            <QuoteButton />
            <Link href={localeHref(locale, "/fleet")} className="abt-ghost-button">
              {t.fleetCta} <ArrowRight size={19} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

      <div className="abt-stats">
        {t.stats.map((stat) => (
          <div className="abt-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span className="abt-stat-rule" aria-hidden="true" />
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="abt-mission" aria-labelledby="abt-mission-title">
        <div className="abt-mission-head">
          <p className="abt-section-eyebrow">{t.missionEyebrow}</p>
          <h2 id="abt-mission-title">
            {t.missionTitleLines[0]}
            <br />
            {t.missionTitleLines[1]}
          </h2>
        </div>
        <div className="abt-mission-body">
          {t.missionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="abt-quote">{t.missionQuote}</p>
        </div>
      </section>

      <section className="abt-guarantees" aria-labelledby="abt-guarantees-title">
        <div className="abt-guarantees-head">
          <p className="abt-section-eyebrow">{t.guaranteesEyebrow}</p>
          <h2 id="abt-guarantees-title">{t.guaranteesHeading}</h2>
          <p>{t.guaranteesLead}</p>
        </div>

        <div className="abt-bento">
          {t.guarantees.map((guarantee, index) => {
            const Icon = guaranteeIcons[index];
            const isMedia = index === 1;

            return (
              <article className={`abt-card ${guaranteeSpans[index]}`} key={guarantee.title}>
                {isMedia ? (
                  <>
                    <Image
                      src="/images/service-van-interior.png"
                      alt={t.fleetImageAlt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 40vw"
                      className="abt-card-image"
                    />
                    <div className="abt-card-veil" aria-hidden="true" />
                  </>
                ) : null}
                <div className="abt-card-content">
                  <span className="abt-card-icon">
                    <Icon size={26} strokeWidth={2.1} />
                  </span>
                  <h3>{guarantee.title}</h3>
                  <p>{guarantee.text}</p>
                </div>
                <span className="abt-card-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="abt-compare" aria-labelledby="abt-compare-title">
        <div className="abt-compare-head">
          <p className="abt-section-eyebrow">{t.compareEyebrow}</p>
          <h2 id="abt-compare-title">{t.compareHeading}</h2>
          <span aria-hidden="true" />
        </div>

        <div className="abt-compare-grid">
          <div className="abt-panel">
            <h3>{t.compareOldTitle}</h3>
            <ul>
              {t.compareOldSteps.map((step) => (
                <li key={step}>
                  <Minus size={18} strokeWidth={3} />
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <div className="abt-panel abt-panel-alt">
            <h3>{t.compareNewTitle}</h3>
            <ul>
              {t.compareNewSteps.map((step) => (
                <li key={step}>
                  <Check size={18} strokeWidth={3} />
                  {step}
                </li>
              ))}
            </ul>
            <p className="abt-panel-note">
              <Handshake size={22} strokeWidth={2.2} />
              {t.compareNote}
            </p>
          </div>
        </div>
      </section>

      <section className="container about-bottom-cta" aria-label={t.ctaAria}>
        <div className="about-bottom-cta-copy">
          <span className="about-cta-icon"><Handshake size={34} /></span>
          <div>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
        </div>
        <QuoteButton />
      </section>

      <Footer locale={locale} />
      <QuoteModal />
    </main>
  );
}
