import Image from "next/image";
import {
  Box,
  ClipboardList,
  Clock3,
  DoorOpen,
  Headphones,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteButton from "@/components/QuoteButton";
import QuoteModal from "@/components/QuoteModal";

const offers = [
  {
    icon: Box,
    title: "Daily Freight Service",
    text: "Daily service between Montreal and Toronto along Highway 401. Every business day.",
    image: "/images/service-highway-401.png"
  },
  {
    icon: Clock3,
    title: "Same-Day Delivery",
    text: "Time-sensitive shipments delivered the same day. Fast, efficient, and reliable.",
    image: "/images/service-cargo-van-driving.png"
  },
  {
    icon: DoorOpen,
    title: "Door-to-Door Service",
    text: "Direct pickup and delivery to your door. No terminal transfers.",
    image: "/images/service-door-loading.png"
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Cargo Van",
    text: "One shipment. One vehicle. One driver. Maximum safety and control.",
    image: "/images/service-van-interior.png"
  }
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Reliable & Safe",
    text: "Well-maintained vehicles and professional drivers you can trust."
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    text: "We value your time and deliver as promised."
  },
  {
    icon: MapPin,
    title: "401 Corridor Experts",
    text: "Specialized in the Montreal-Toronto freight corridor."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Friendly team here to help with all your shipping needs."
  }
];

const steps = [
  {
    icon: ClipboardList,
    title: "Request a Quote",
    text: "Contact us with your shipment details."
  },
  {
    icon: PackageCheck,
    title: "Pickup",
    text: "We pick up your freight at your location."
  },
  {
    icon: Truck,
    title: "On the Way",
    text: "Your freight is on its way via Highway 401."
  },
  {
    icon: Box,
    title: "Delivered",
    text: "Delivered safely and on time to your destination."
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="Services" />

      <section className="container services-page-hero" aria-label="Mandy Express freight solutions">
        <div className="services-hero-copy">
          <p className="services-eyebrow">Our Services</p>
          <h1>
            <span>Freight Solutions</span>
            <span>You Can Count On</span>
          </h1>
          <div className="services-orange-rule" />
          <p>
            We provide fast, reliable, and secure freight
            <br />
            transportation along the Montreal-Toronto
            <br />
            corridor.
          </p>
          <QuoteButton />
        </div>
        <div className="services-hero-media">
          <Image
            src="/images/services-hero-clean.png"
            alt="2025 Mercedes-Benz Sprinter Extended High Roof cargo van with Mandy Express logo and slogan on Highway 401 near Toronto"
            width={2400}
            height={1080}
            priority
            className="services-hero-image"
          />
        </div>
      </section>

      <section className="container services-page-section" aria-labelledby="what-we-offer">
        <div className="services-section-heading">
          <h2 id="what-we-offer">What We Offer</h2>
          <span />
        </div>

        <div className="offer-card-grid">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <article className="offer-card" key={offer.title}>
                <div className="offer-icon">
                  <Icon size={40} strokeWidth={2.3} />
                </div>
                <h3>{offer.title}</h3>
                <span className="card-orange-rule" />
                <p>{offer.text}</p>
                <Image src={offer.image} alt="" width={640} height={278} className="offer-image" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="container why-choose-section" aria-labelledby="why-choose">
        <div className="services-section-heading">
          <h2 id="why-choose">Why Choose Mandy Express?</h2>
          <span />
        </div>

        <div className="reason-grid">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <article className={`reason-item ${index > 0 ? "lg:border-l" : ""}`} key={reason.title}>
                <Icon size={48} strokeWidth={2.1} />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container how-it-works-section" aria-labelledby="how-it-works">
        <div className="services-section-heading">
          <h2 id="how-it-works">How It Works</h2>
          <span />
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="step-item" key={step.title}>
                <div className="step-icon-wrap">
                  <Icon size={42} strokeWidth={2.1} />
                  <span>{index + 1}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
      <QuoteModal />
    </main>
  );
}
