"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Clock3, FileText, MapPin, Package, Send, User, X } from "lucide-react";
import { useI18n } from "./I18nProvider";

export default function QuoteModal() {
  const { locale, dict } = useI18n();
  const t = dict.quote;
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener("openQuoteModal", openModal);
    return () => window.removeEventListener("openQuoteModal", openModal);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const getValue = (name: string) => String(formData.get(name) || "");

    const payload = {
      fullName: getValue("fullName"),
      company: getValue("company"),
      phone: getValue("phone"),
      email: getValue("email"),
      pickupLocation: getValue("pickupLocation"),
      deliveryLocation: getValue("deliveryLocation"),
      pickupDate: getValue("pickupDate"),
      requiredDeliveryTime: getValue("requiredDeliveryTime"),
      typeOfGoods: getValue("typeOfGoods"),
      numberOfPallets: getValue("numberOfPallets"),
      approximateWeight: getValue("approximateWeight"),
      dimensions: getValue("dimensions"),
      specialRequirements: formData.getAll("specialRequirements").map(String),
      additionalNotes: getValue("additionalNotes"),
      companyWebsite: getValue("companyWebsite"),
      locale
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof result.error === "string" ? result.error : t.errorFallback);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t.errorFallback);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quote-modal-overlay" role="presentation" onMouseDown={closeModal}>
      <div
        className="quote-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="quote-modal-header">
          <div className="quote-title-wrap">
            <span className="quote-title-icon"><FileText size={24} /></span>
            <div>
              <h2 id="quote-modal-title">{t.title}</h2>
              <p>{t.subtitle}</p>
            </div>
          </div>
          <button type="button" className="quote-close-button" aria-label={t.closeAria} onClick={closeModal}>
            <X size={24} />
          </button>
        </div>

        {status === "success" ? (
          <div className="quote-success">
            <CheckCircle2 size={54} />
            <h3>{t.successTitle}</h3>
            <p>{t.successBody}</p>
            <button type="button" className="quote-button inline-flex" onClick={closeModal}>
              {t.close}
            </button>
          </div>
        ) : (
          <form
            className="quote-form"
            onSubmit={handleSubmit}
          >
            <input type="text" name="companyWebsite" className="quote-honey" tabIndex={-1} autoComplete="off" />

            <section className="quote-panel">
              <h3><User size={21} /> {t.contactInfo}</h3>
              <div className="quote-field-grid two-cols">
                <label>
                  {t.fullName} <span>*</span>
                  <input name="fullName" type="text" placeholder={t.fullNamePlaceholder} required />
                </label>
                <label>
                  {t.company} <span>*</span>
                  <input name="company" type="text" placeholder={t.companyPlaceholder} required />
                </label>
                <label>
                  {t.phone} <span>*</span>
                  <input name="phone" type="tel" placeholder={t.phonePlaceholder} required />
                </label>
                <label>
                  {t.email} <span>*</span>
                  <input name="email" type="email" placeholder={t.emailPlaceholder} required />
                </label>
              </div>
            </section>

            <section className="quote-panel">
              <h3><MapPin size={21} /> {t.shipmentInfo}</h3>
              <div className="quote-field-grid two-cols">
                <label>
                  {t.pickupLocation} <span>*</span>
                  <input name="pickupLocation" type="text" placeholder={t.pickupLocationPlaceholder} required />
                </label>
                <label>
                  {t.deliveryLocation} <span>*</span>
                  <input name="deliveryLocation" type="text" placeholder={t.deliveryLocationPlaceholder} required />
                </label>
                <label>
                  {t.pickupDate} <span>*</span>
                  <input name="pickupDate" type="date" required />
                </label>
                <label>
                  {t.requiredDeliveryTime} <span>*</span>
                  <select name="requiredDeliveryTime" required>
                    <option value="">{t.deliveryTimePlaceholder}</option>
                    {t.deliveryTimeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="quote-panel">
              <h3><Package size={21} /> {t.additionalDetails}</h3>
              <label className="quote-full-label">
                {t.typeOfGoods} <span>*</span>
              </label>
              <div className="goods-grid">
                {t.goodsTypes.map((type) => (
                  <label key={type} className="choice-card">
                    <input type="radio" name="typeOfGoods" value={type} required />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              <div className="quote-field-grid two-cols details-grid">
                <label>
                  {t.numberOfPallets} <span>*</span>
                  <input name="numberOfPallets" type="number" min="0" placeholder={t.palletsPlaceholder} required />
                </label>
                <label>
                  {t.approximateWeight} <span>*</span>
                  <input name="approximateWeight" type="text" placeholder={t.weightPlaceholder} required />
                </label>
                <label className="span-two">
                  {t.dimensions}
                  <input name="dimensions" type="text" placeholder={t.dimensionsPlaceholder} />
                </label>
              </div>
            </section>

            <section className="quote-panel">
              <h3><Clock3 size={21} /> {t.specialRequirements}</h3>
              <div className="requirements-grid">
                {t.specialRequirementOptions.map((requirement) => (
                  <label key={requirement}>
                    <input type="checkbox" name="specialRequirements" value={requirement} />
                    {requirement}
                  </label>
                ))}
              </div>
            </section>

            <section className="quote-panel notes-panel">
              <h3><FileText size={21} /> {t.additionalNotes}</h3>
              <label>
                {t.additionalNotes}
                <textarea name="additionalNotes" placeholder={t.notesPlaceholder} rows={5} />
              </label>
            </section>

            {status === "error" && <p className="quote-error">{errorMessage}</p>}

            <button className="quote-submit-button" type="submit" disabled={status === "submitting"}>
              <Send size={20} />
              {status === "submitting" ? t.submitting : t.submit}
            </button>
            <p className="quote-secure">{t.secureNote}</p>
          </form>
        )}
      </div>
    </div>
  );
}
