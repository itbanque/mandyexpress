import { CalendarDays, Clock3, DoorOpen, Route } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const serviceIcons = [Clock3, CalendarDays, DoorOpen, Route];

export default async function Services({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <section id="services" className="bg-white py-7 md:py-8">
      <div className="container services-grid">
        {dict.home.services.map((service, index) => {
          const Icon = serviceIcons[index];

          return (
            <article key={service.title} className={`service-card ${index > 0 ? "lg:border-l" : ""}`}>
              <div className="service-icon">
                <Icon size={48} strokeWidth={2.8} />
              </div>
              <h2>{service.title}</h2>
              {service.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          );
        })}
      </div>
    </section>
  );
}
