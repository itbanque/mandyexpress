import Image from "next/image";
import { Clock3, Globe2, Mail, MapPin, Phone } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import QuoteModal from "@/components/QuoteModal";
import ContactForm from "./ContactForm";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "514-623-5486",
    href: "tel:5146235486"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@mandyexpress.ca",
    href: "mailto:info@mandyexpress.ca"
  },
  {
    icon: Globe2,
    label: "Website",
    value: "mandyexpress.ca",
    href: "https://mandyexpress.ca"
  },
  {
    icon: MapPin,
    label: "Office",
    value: ["Suite 620, 99 Cameron St", "Toronto, ON M5T 3A2", "Canada"]
  },
  {
    icon: Clock3,
    label: "Business Hours",
    value: ["Mon – Fri: 8:00 AM – 6:00 PM", "Sat – Sun: By appointment only"]
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header activeItem="Contact" />

      <section className="container contact-hero" aria-label="Contact Mandy Express">
        <Image
          src="/images/fleet-hero.png"
          alt=""
          width={1500}
          height={540}
          priority
          className="contact-hero-image"
        />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-copy">
          <h1>Contact Us</h1>
          <p>We&apos;re here to help. Get in touch with our team.</p>
          <span />
        </div>
      </section>

      <section className="container contact-main-section" aria-label="Contact information and message form">
        <aside className="contact-info-panel">
          <div className="contact-section-heading">
            <h2>Contact Information</h2>
            <span />
          </div>

          <div className="contact-info-list">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="contact-info-icon">
                    <Icon size={24} strokeWidth={2.1} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <span>
                      {Array.isArray(item.value)
                        ? item.value.map((line) => <span key={line}>{line}</span>)
                        : item.value}
                    </span>
                  </span>
                </>
              );

              return item.href ? (
                <a href={item.href} className="contact-info-item" key={item.label}>
                  {content}
                </a>
              ) : (
                <div className="contact-info-item" key={item.label}>
                  {content}
                </div>
              );
            })}
          </div>
        </aside>

        <section className="contact-form-panel" aria-labelledby="contact-form-heading">
          <div className="contact-section-heading">
            <h2 id="contact-form-heading">Send Us a Message</h2>
            <span />
          </div>
          <ContactForm />
        </section>
      </section>

      <Footer />
      <QuoteModal />
    </main>
  );
}
