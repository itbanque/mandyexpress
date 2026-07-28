import type { Metadata } from "next";
import Image from "next/image";
import {
  Box,
  Clock3,
  DoorOpen,
  Gauge,
  MoveHorizontal,
  MoveVertical,
  PackageOpen,
  Phone,
  Ruler,
  ShieldCheck,
  Truck
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteButton from "@/components/QuoteButton";
import QuoteModal from "@/components/QuoteModal";
import { localeFromParams } from "@/lib/dictionaries";
import { pageAlternates } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, dict } = await localeFromParams(params);

  return {
    title: dict.meta.fleet.title,
    description: dict.meta.fleet.description,
    alternates: pageAlternates(locale, "/fleet")
  };
}

const specIcons = [Box, Gauge, Ruler, MoveVertical, MoveHorizontal, DoorOpen];
const advantageIcons = [ShieldCheck, Clock3, Truck, PackageOpen];

export default async function FleetPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);
  const t = dict.fleetPage;

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="fleet" />

      <section className="fleet-hero" aria-label={t.heroAria}>
        <div className="fleet-hero-copy">
          <p className="fleet-eyebrow">{t.eyebrow}</p>
          <h1>
            <span>{t.heroTitleLines[0]}</span>
            <span>{t.heroTitleLines[1]}</span>
          </h1>
          <span className="fleet-orange-rule" />
          <p>{t.heroText}</p>
        </div>
        <div className="fleet-hero-visual">
          <Image
            src="/images/fleet-hero-v2.png"
            alt={t.heroImageAlt}
            width={1380}
            height={497}
            priority
            className="fleet-hero-image"
          />
        </div>
      </section>

      <section className="fleet-section" aria-labelledby="cargo-van">
        <div className="services-section-heading fleet-heading">
          <h2 id="cargo-van">{t.cargoVanHeading}</h2>
          <span />
        </div>

        <article className="fleet-van-card">
          <div className="fleet-van-image-panel">
            <Image
              src="/images/fleet-cargo-van-v2.png"
              alt={t.vanImageAlt}
              width={914}
              height={643}
              className="fleet-van-image"
            />
          </div>
          <div className="fleet-van-info">
            <h3>{t.vanName}</h3>
            <p>{t.vanText}</p>

            <div className="fleet-spec-grid">
              {t.specs.map((spec, index) => {
                const Icon = specIcons[index];
                return (
                  <div className="fleet-spec-item" key={spec.label}>
                    <Icon size={30} strokeWidth={2} />
                    <div>
                      <h4>{spec.label}</h4>
                      <p>{spec.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </section>

      <section className="container fleet-advantages-section" aria-labelledby="fleet-advantages">
        <div className="services-section-heading fleet-heading">
          <h2 id="fleet-advantages">{t.advantagesHeading}</h2>
          <span />
        </div>

        <div className="fleet-advantages-grid">
          {t.advantages.map((advantage, index) => {
            const Icon = advantageIcons[index];
            return (
              <article className={`fleet-advantage ${index > 0 ? "fleet-advantage-divider" : ""}`} key={advantage.title}>
                <Icon size={50} strokeWidth={2} />
                <h3>{advantage.title}</h3>
                <p>{advantage.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container fleet-bottom-cta" aria-label={t.ctaAria}>
        <div className="fleet-bottom-cta-copy">
          <span className="fleet-phone-icon"><Phone size={34} /></span>
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
