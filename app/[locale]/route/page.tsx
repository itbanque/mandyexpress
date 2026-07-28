import type { Metadata } from "next";
import { CalendarDays, Clock3, Map, MapPin, Package } from "lucide-react";
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
    title: dict.meta.route.title,
    description: dict.meta.route.description,
    alternates: pageAlternates(locale, "/route")
  };
}

// Google 地图官方 iframe 端点（就是「分享 → 嵌入地图」给的那个），免 API key、免注册。
// pb 参数里能直接读出起终点，要改路线改这两个地名即可。
// 结尾的 !3e0 = 只显示驾车路线；不加的话 Google 会同时列出航班和公共交通的时间。
const CORRIDOR_MAP_SRC =
  "https://www.google.com/maps/embed?origin=mfe&pb=!1m6!4m5!4m1!2sToronto,ON!4m1!2sMontreal,QC!3e0";

const detailIcons = [MapPin, Clock3, Map, CalendarDays, Package];

function HighwayShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 92 92" aria-hidden="true">
      <path
        d="M46 8c12 8 24 8 36 4v24c0 23-13 38-36 48C23 74 10 59 10 36V12c12 4 24 4 36-4Z"
        fill="#0b2345"
      />
      <text x="46" y="57" textAnchor="middle" className="route-shield-text">
        401
      </text>
    </svg>
  );
}

export default async function RoutePage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);
  const t = dict.routePage;

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="route" />

      <section className="container route-hero" aria-label={t.heroAria}>
        <h1>
          <span>{t.toronto}</span>
          <span className="route-arrow" aria-hidden="true">↔</span>
          <HighwayShield className="route-hero-shield" />
          <span className="route-arrow" aria-hidden="true">↔</span>
          <span>{t.montreal}</span>
        </h1>
        <p>{t.heroSubtitle}</p>
        <QuoteButton />
      </section>

      <section className="container route-corridor-section" aria-labelledby="corridor-heading">
        <div className="route-section-heading">
          <h2 id="corridor-heading">{t.corridorHeading}</h2>
          <span />
        </div>
        <div className="route-map-embed">
          <iframe
            src={CORRIDOR_MAP_SRC}
            title={t.mapAria}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="container route-details-section" aria-labelledby="details-heading">
        <div className="route-section-heading">
          <h2 id="details-heading">{t.detailsHeading}</h2>
          <span />
        </div>
        <div className="route-details-grid">
          {t.details.map((detail, index) => {
            const Icon = detailIcons[index];
            return (
              <article className={`route-detail-column ${index > 0 ? "route-column-divider" : ""}`} key={detail.title}>
                <Icon size={34} strokeWidth={1.9} />
                <h3>{detail.title}</h3>
                {detail.lines.map((line) => (
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
