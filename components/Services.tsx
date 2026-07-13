import { CalendarDays, Clock3, DoorOpen, Route } from "lucide-react";

const services = [
  {
    icon: Clock3,
    title: "Same-Day Delivery",
    lines: ["Pick up in the morning.", "Deliver the same day."]
  },
  {
    icon: CalendarDays,
    title: "Daily Dedicated Service",
    lines: ["Toronto ↔ Montreal", "Every business day."]
  },
  {
    icon: DoorOpen,
    title: "Door-to-Door",
    lines: ["No terminal transfers.", "Direct to your door."]
  },
  {
    icon: Route,
    title: "401 Corridor Specialists",
    lines: ["One route.", "One focus."]
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-7 md:py-8">
      <div className="container services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;

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
