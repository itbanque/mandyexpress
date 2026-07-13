import Image from "next/image";
import { CalendarDays, Clock3, Handshake, MapPin, Package, Phone, ShieldCheck, Users } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteButton from "@/components/QuoteButton";
import QuoteModal from "@/components/QuoteModal";

const highlights = [
  {
    icon: CalendarDays,
    title: "Daily Service",
    lines: ["Montreal to Toronto", "Every Business Day"]
  },
  {
    icon: ShieldCheck,
    title: "100%",
    lines: ["On-Time Delivery", "Our Commitment"]
  },
  {
    icon: MapPin,
    title: "401 Corridor",
    lines: ["Specialized Route", "Expertise"]
  },
  {
    icon: Users,
    title: "Canadian Owned",
    lines: ["Local Business.", "Personal Service."]
  }
];

const values = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    lines: ["We do what we say.", "Every delivery, every time."]
  },
  {
    icon: Clock3,
    title: "Punctuality",
    lines: ["Time is critical.", "We always stay on schedule."]
  },
  {
    icon: Handshake,
    title: "Partnership",
    lines: ["We work as an extension", "of your business."]
  },
  {
    icon: Package,
    title: "Care",
    lines: ["Your freight is handled", "with care and respect."]
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="About Us" />

      <section className="container about-hero" aria-label="About Mandy Express">
        <Image
          src="/images/about-hero.png"
          alt="Mandy Express Sprinter cargo van on the Highway 401 Toronto corridor"
          width={1440}
          height={560}
          priority
          className="about-hero-image"
        />
        <div className="about-hero-gradient" />
        <div className="about-hero-copy">
          <p className="about-eyebrow">About Mandy Express</p>
          <h1>
            <span>More Than Cargo.</span>
            <span>Your Trust, Our Priority.</span>
          </h1>
          <span className="about-orange-rule" />
          <p>
            Mandy Express Freight Service is a Canadian-owned company specializing in daily freight transportation along
            the Montreal-Toronto corridor.
          </p>
          <p>
            We are committed to delivering your freight safely, on time, every time. Your business keeps moving, and we
            make it happen.
          </p>
        </div>
      </section>

      <section className="container about-highlight-card" aria-label="Mandy Express company highlights">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          return (
            <article className={`about-highlight ${index > 0 ? "about-column-divider" : ""}`} key={highlight.title}>
              <Icon size={48} strokeWidth={1.9} />
              <h2>{highlight.title}</h2>
              {highlight.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          );
        })}
      </section>

      <section className="container about-story-section" aria-labelledby="about-story">
        <div className="about-story-copy">
          <p className="about-eyebrow">Our Story</p>
          <h2 id="about-story">
            <span>Built on Reliability.</span>
            <span>Driven by Commitment.</span>
          </h2>
          <span className="about-orange-rule" />
          <p>
            Mandy Express was founded with a simple mission: to provide fast, reliable, and hassle-free freight service
            between Montreal and Toronto.
          </p>
          <p>
            With years of experience in the logistics industry, we understand what businesses need - consistent service,
            clear communication, and a partner you can count on.
          </p>
          <p>We don&apos;t just move cargo. We deliver peace of mind.</p>
        </div>
        <Image
          src="/images/about-story.png"
          alt="Highway 401 signs for Montreal and Toronto"
          width={760}
          height={420}
          className="about-story-image"
        />
      </section>

      <section className="container about-values-section" aria-labelledby="about-values">
        <div className="about-section-heading">
          <h2 id="about-values">Our Values</h2>
          <span />
        </div>
        <div className="about-values-grid">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <article className={`about-value ${index > 0 ? "about-column-divider" : ""}`} key={value.title}>
                <Icon size={46} strokeWidth={1.9} />
                <h3>{value.title}</h3>
                {value.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </article>
            );
          })}
        </div>
      </section>

      <section className="container about-bottom-cta" aria-label="Move forward together">
        <div className="about-bottom-cta-copy">
          <span className="about-phone-icon">
            <Phone size={34} />
          </span>
          <div>
            <h2>Let&apos;s Move Forward Together</h2>
            <p>Contact us today to experience reliable freight service you can trust.</p>
          </div>
        </div>
        <QuoteButton />
      </section>

      <Footer />
      <QuoteModal />
    </main>
  );
}
