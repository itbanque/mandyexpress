import Image from "next/image";
import { Clock3 } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const t = dict.home;

  // The headline is live text over a text-free photo (not baked into the image),
  // so search engines can read it, it stays sharp on high-DPI screens and the
  // French page gets French copy.
  return (
    <section className="container hero-section" aria-label={t.heroAria}>
      <Image
        src="/images/hero-home.webp"
        alt={t.heroAlt}
        width={1380}
        height={752}
        priority
        className="hero-image"
      />
      <div className="hero-copy">
        <h1>
          <span className="hero-title">{t.heroTitleLines[0]}</span>{" "}
          <span className="hero-title hero-title-accent">{t.heroTitleLines[1]}</span>{" "}
          <span className="hero-rule" aria-hidden="true" />
          <span className="hero-route">
            {t.heroFrom}{" "}
            <span className="hero-route-arrow" aria-hidden="true">
              ↔
            </span>{" "}
            {t.heroTo}
          </span>
        </h1>
        <p className="hero-corridor">{t.heroCorridor}</p>
        <div className="hero-tagline">
          <Clock3 className="hero-tagline-icon" strokeWidth={2.2} aria-hidden="true" />
          <p>
            {t.heroTagline.map(([plain, accent]) => (
              <span key={plain}>
                {plain} <em>{accent}</em>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
