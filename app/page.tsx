import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RouteMap from "@/components/RouteMap";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header />
      <Hero />
      <Services />
      <RouteMap />
      <Footer />
      <QuoteModal />
    </main>
  );
}
