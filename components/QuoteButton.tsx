"use client";

import { ArrowRight } from "lucide-react";
import { useI18n } from "./I18nProvider";

type QuoteButtonProps = {
  className?: string;
  label?: string;
};

export default function QuoteButton({ className = "", label }: QuoteButtonProps) {
  const { dict } = useI18n();

  return (
    <button
      type="button"
      className={`quote-button ${className}`}
      onClick={() => window.dispatchEvent(new Event("openQuoteModal"))}
    >
      {label ?? dict.common.getAQuote} <ArrowRight size={21} strokeWidth={3} />
    </button>
  );
}
