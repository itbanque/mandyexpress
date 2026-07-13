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

const specs = [
  { icon: Box, label: "Cargo Space", value: "Up to 13.5 m³" },
  { icon: Gauge, label: "Payload Capacity", value: "Up to 3,500 KG" },
  { icon: Ruler, label: "Length", value: "Up to 4.2 m" },
  { icon: MoveVertical, label: "Height", value: "Up to 1.9 m" },
  { icon: MoveHorizontal, label: "Width", value: "Up to 1.7 m" },
  { icon: DoorOpen, label: "Access", value: "Rear & Side Door" }
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Reliable & Safe",
    text: "Well-maintained fleet ensuring the safety of your cargo."
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    text: "Built for speed and efficiency along Highway 401."
  },
  {
    icon: Truck,
    title: "Dedicated Service",
    text: "One shipment. One vehicle. One driver."
  },
  {
    icon: PackageOpen,
    title: "Secure Handling",
    text: "Your freight is handled with care from pickup to delivery."
  }
];

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="Fleet" />

      <section className="container fleet-hero" aria-label="Mandy Express fleet">
        <Image
          src="/images/fleet-hero.png"
          alt="Mandy Express 2025 Mercedes-Benz Sprinter Extended High Roof on Highway 401 near Toronto"
          width={1500}
          height={680}
          priority
          className="fleet-hero-image"
        />
        <div className="fleet-hero-overlay" />
        <div className="fleet-hero-copy">
          <p className="fleet-eyebrow">Our Fleet</p>
          <h1>
            <span>Built for Speed.</span>
            <span>Built for Reliability.</span>
          </h1>
          <span className="fleet-orange-rule" />
          <p>
            Our modern fleet of cargo vans is designed to deliver your freight safely, quickly, and on time along the
            Montreal-Toronto corridor.
          </p>
        </div>
      </section>

      <section className="container fleet-section" aria-labelledby="cargo-van">
        <div className="services-section-heading fleet-heading">
          <h2 id="cargo-van">Our Cargo Van</h2>
          <span />
        </div>

        <article className="fleet-van-card">
          <div className="fleet-van-image-panel">
            <Image
              src="/images/fleet-cargo-van.png"
              alt="Mandy Express 2025 Mercedes-Benz Sprinter Extended High Roof cargo van"
              width={1100}
              height={620}
              className="fleet-van-image"
            />
          </div>
          <div className="fleet-van-info">
            <h3>Sprinter Cargo Van</h3>
            <p>Spacious, clean, and equipped to handle your freight with care. Ideal for time-sensitive shipments.</p>

            <div className="fleet-spec-grid">
              {specs.map((spec) => {
                const Icon = spec.icon;
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
          <h2 id="fleet-advantages">Fleet Advantages</h2>
          <span />
        </div>

        <div className="fleet-advantages-grid">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
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

      <section className="container fleet-bottom-cta" aria-label="Need freight service">
        <div className="fleet-bottom-cta-copy">
          <span className="fleet-phone-icon"><Phone size={34} /></span>
          <div>
            <h2>Need Freight Service?</h2>
            <p>Contact us today for a fast and accurate quote.</p>
          </div>
        </div>
        <QuoteButton />
      </section>

      <Footer />
      <QuoteModal />
    </main>
  );
}
