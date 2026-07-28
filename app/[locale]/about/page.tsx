import type { Metadata } from "next";
import Image from "next/image";
import { Clock3, Handshake, Package, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteModal from "@/components/QuoteModal";
import { localeFromParams } from "@/lib/dictionaries";
import { pageAlternates } from "@/lib/i18n";

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

const valueIcons = [ShieldCheck, Clock3, Handshake, Package];

export default async function AboutPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);
  const t = dict.aboutPage;

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="about" />

      <section className="about-hero" aria-label={t.heroAria}>
        <Image
          src="/images/fleet-hero-v2.png"
          alt={t.heroImageAlt}
          fill
          priority
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="about-hero-image"
        />
        <div className="about-hero-gradient" aria-hidden="true" />
        <div className="about-hero-content">
          <p className="about-eyebrow">{t.eyebrow}</p>
          <h1>
            {t.heroTitleLines[0]}
            <br />
            {t.heroTitleLines[1]}
          </h1>
          <span className="about-orange-rule" />
          <p>{t.heroParagraphs[0]}</p>
          <p>{t.heroParagraphs[1]}</p>
        </div>
      </section>

      <div className="about-page-width">
        <section className="about-story" aria-labelledby="about-story">
          <div className="story-copy">
            <p className="about-eyebrow eyebrow">{t.storyEyebrow}</p>
            <h2 id="about-story">
              {t.storyTitleLines[0]}
              <br />
              {t.storyTitleLines[1]}
            </h2>
            <span className="about-orange-rule" />
            <p>{t.storyParagraphs[0]}</p>
            <p>{t.storyParagraphs[1]}</p>
            <p>{t.storyParagraphs[2]}</p>
          </div>
          <div className="story-image-wrap">
            <div className="story-image-needed" aria-hidden="true" />
          </div>
        </section>
      </div>

      <section className="container about-values-section" aria-labelledby="about-values">
        <div className="about-section-heading">
          <h2 id="about-values">{t.valuesHeading}</h2>
          <span />
        </div>
        <div className="about-values-grid">
          {t.values.map((value, index) => {
            const Icon = valueIcons[index];
            return (
              <article className={`about-value ${index > 0 ? "about-column-divider" : ""}`} key={value.title}>
                <Icon size={46} strokeWidth={1.9} />
                <h3>{value.title}</h3>
                {value.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            );
          })}
        </div>
      </section>

      <Footer locale={locale} />
      <QuoteModal />
    </main>
  );
}
