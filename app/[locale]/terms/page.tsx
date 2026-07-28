import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { localeFromParams } from "@/lib/dictionaries";
import { pageAlternates } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, dict } = await localeFromParams(params);

  return {
    title: dict.meta.terms.title,
    description: dict.meta.terms.description,
    alternates: pageAlternates(locale, "/terms")
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);

  return <LegalPage locale={locale} idPrefix="terms" content={dict.termsPage} />;
}
