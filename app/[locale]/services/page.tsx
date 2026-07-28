import type { Metadata } from "next";
import Image from "next/image";
import {
  Box,
  ClipboardList,
  Clock3,
  DoorOpen,
  Headphones,
  MapPin,
  PackageCheck,
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
    title: dict.meta.services.title,
    description: dict.meta.services.description,
    alternates: pageAlternates(locale, "/services")
  };
}

const offerIcons = [Box, Clock3, DoorOpen, ShieldCheck];
const offerImages = [
  "/images/service-highway-401.png",
  "/images/service-cargo-van-driving.png",
  "/images/service-door-loading.png",
  "/images/service-van-interior.png"
];
const reasonIcons = [ShieldCheck, Clock3, MapPin, Headphones];
const stepIcons = [ClipboardList, PackageCheck, Truck, Box];

export default async function ServicesPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);
  const t = dict.servicesPage;

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="services" />

      <section className="container services-page-hero" aria-label={t.heroAria}>
        <Image
          src="/images/hero-large-v2-clean.png"
          alt={t.heroImageAlt}
          width={1380}
          height={752}
          priority
          className="services-hero-image"
        />
        <div className="services-hero-gradient" />
        <div className="services-hero-copy">
          <p className="services-eyebrow">{t.eyebrow}</p>
          <h1>
            <span>{t.heroTitleLines[0]}</span>
            <span>{t.heroTitleLines[1]}</span>
          </h1>
          <div className="services-orange-rule" />
          <p>{t.heroText}</p>
          <QuoteButton />
        </div>
      </section>

      <section className="container services-page-section" aria-labelledby="what-we-offer">
        <div className="services-section-heading">
          <h2 id="what-we-offer">{t.whatWeOffer}</h2>
          <span />
        </div>

        <div className="offer-card-grid">
          {t.offers.map((offer, index) => {
            const Icon = offerIcons[index];
            return (
              <article className="offer-card" key={offer.title}>
                <div className="offer-icon">
                  <Icon size={40} strokeWidth={2.3} />
                </div>
                <h3>{offer.title}</h3>
                <span className="card-orange-rule" />
                <p>{offer.text}</p>
                <Image src={offerImages[index]} alt="" width={640} height={278} className="offer-image" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="container why-choose-section" aria-labelledby="why-choose">
        <div className="services-section-heading">
          <h2 id="why-choose">{t.whyChoose}</h2>
          <span />
        </div>

        <div className="reason-grid">
          {t.reasons.map((reason, index) => {
            const Icon = reasonIcons[index];
            return (
              <article className={`reason-item ${index > 0 ? "lg:border-l" : ""}`} key={reason.title}>
                <Icon size={48} strokeWidth={2.1} />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container how-it-works-section" aria-labelledby="how-it-works">
        <div className="services-section-heading">
          <h2 id="how-it-works">{t.howItWorks}</h2>
          <span />
        </div>

        <div className="steps-grid">
          {t.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <article className="step-item" key={step.title}>
                <div className="step-icon-wrap">
                  <Icon size={42} strokeWidth={2.1} />
                  <span>{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
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
