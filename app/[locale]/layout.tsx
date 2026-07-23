import type { Metadata } from "next";
import "../globals.css";
import I18nProvider from "@/components/I18nProvider";
import { getDictionary, localeFromParams } from "@/lib/dictionaries";
import { locales } from "@/lib/i18n";

const siteName = "Mandy Express";

type LayoutParams = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale, dict } = await localeFromParams(params);
  const meta = dict.meta.root;
  const ogLocale = locale === "fr" ? "fr_CA" : "en_CA";

  return {
    metadataBase: new URL("https://mandyexpress.ca"),
    title: {
      default: meta.title,
      template: "%s | Mandy Express"
    },
    description: meta.description,
    alternates: {
      canonical: "./"
    },
    openGraph: {
      type: "website",
      siteName,
      locale: ogLocale,
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      title: meta.title,
      description: meta.description,
      url: "./",
      images: [
        {
          url: "/images/hero-large.png",
          width: 2048,
          height: 1116,
          alt: meta.ogImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description
    }
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
}> &
  LayoutParams) {
  const { locale } = await localeFromParams(params);
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <I18nProvider locale={locale} dict={dict}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
