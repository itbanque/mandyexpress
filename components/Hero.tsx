import Image from "next/image";

export default function Hero() {
  return (
    <section className="container hero-section" aria-label="Mandy Express same-day freight delivery">
      <Image
        src="/images/hero-large.png"
        alt="Mandy Express same-day freight delivery from Toronto to Montreal along Highway 401 with a 2025 Mercedes-Benz Sprinter Extended High Roof"
        width={2048}
        height={1116}
        priority
        className="hero-image"
      />
    </section>
  );
}
