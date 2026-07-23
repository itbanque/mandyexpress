/* eslint-disable @next/next/no-img-element */

import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

export default async function RouteMap({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section id="route" className="route-section" aria-label={dict.home.routeAria}>
      <div className="container route-shell">
        <img
          src="/images/route-map-complete.png"
          alt={dict.home.routeMapAlt}
          className="route-map-image"
        />
      </div>
    </section>
  );
}
