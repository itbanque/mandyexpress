import Image from "next/image";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function Hero({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section className="container hero-section" aria-label={dict.home.heroAria}>
      <Image
        src="/images/hero-large-v2.png"
        alt={dict.home.heroAlt}
        width={1380}
        height={752}
        priority
        className="hero-image"
      />
    </section>
  );
}
