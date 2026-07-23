import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section className="container hero-section" aria-label={dict.home.heroAria}>
      <Image
        src="/images/hero-large.png"
        alt={dict.home.heroAlt}
        width={2048}
        height={1116}
        priority
        className="hero-image"
      />
    </section>
  );
}
