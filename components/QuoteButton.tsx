"use client";

import { ArrowRight } from "lucide-react";

type QuoteButtonProps = {
  className?: string;
  label?: string;
};

export default function QuoteButton({ className = "", label = "Get a Quote" }: QuoteButtonProps) {
  return (
    <button
      type="button"
      className={`quote-button ${className}`}
      onClick={() => window.dispatchEvent(new Event("openQuoteModal"))}
    >
      {label} <ArrowRight size={21} strokeWidth={3} />
    </button>
  );
}
