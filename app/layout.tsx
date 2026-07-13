import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mandy Express | Same-Day Freight Delivery",
  description:
    "Same-day freight delivery between Toronto and Montreal along Highway 401."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
