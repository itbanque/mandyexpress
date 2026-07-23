import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RouteMap from "@/components/RouteMap";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { localeFromParams } from "@/lib/dictionaries";
import { pageAlternates } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await localeFromParams(params);

  return {
    alternates: pageAlternates(locale, "/")
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await localeFromParams(params);

  return (
    <main className="min-h-screen bg-white text-mandy-navy">
      <Header />
      <Hero locale={locale} />
      <Services locale={locale} />
      <RouteMap locale={locale} />
      <Footer locale={locale} />
      <QuoteModal />
    </main>
  );
}
