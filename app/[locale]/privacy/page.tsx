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
    title: dict.meta.privacy.title,
    description: dict.meta.privacy.description,
    alternates: pageAlternates(locale, "/privacy")
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale, dict } = await localeFromParams(params);

  return <LegalPage locale={locale} idPrefix="privacy" content={dict.privacyPage} />;
}
