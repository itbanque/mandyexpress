import type { Metadata } from "next";
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
// pb 参数里的三个地名依次是 起点 / 途经点 / 终点，要改路线改地名即可。
// 中间的 Kingston 是途经点：不加的话 Google 会同时画出一条绕行的备选路线，
// 钉住 401 上的一个点之后就只剩这一条。
// 结尾的 !3e0 = 只显示驾车路线；不加的话还会列出航班和公共交通的时间。
const CORRIDOR_MAP_SRC =
  "https://www.google.com/maps/embed?origin=mfe&pb=!1m8!4m7!4m1!2sToronto,ON!4m1!2sKingston,ON!4m1!2sMontreal,QC!3e0";

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
        <p className="route-coverage">
          {t.coverageNote}
          <span>{t.coverageSoon}</span>
        </p>
      </section>

      <Footer locale={locale} />
      <QuoteModal />
    </main>
  );
}
