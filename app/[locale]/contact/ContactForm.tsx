"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { isValidEmail } from "@/lib/api-utils";
import { useI18n } from "@/components/I18nProvider";

type FormErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

export default function ContactForm() {
  const { locale, dict } = useI18n();
  const t = dict.contactForm;
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const nextErrors: FormErrors = {};

    if (!name) nextErrors.name = t.errors.name;
    if (!email) {
      nextErrors.email = t.errors.emailRequired;
    } else if (!isValidEmail(email)) {
      nextErrors.email = t.errors.emailInvalid;
    }
    if (!message) nextErrors.message = t.errors.message;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || t.errors.fallback);
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setErrors({
        form: error instanceof Error ? error.message : t.errors.fallback
      });
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <CheckCircle2 size={54} />
        <h3>{t.successTitle}</h3>
        <p>{t.successBody}</p>
        <button type="button" className="quote-button inline-flex" onClick={() => setStatus("idle")}>
          {t.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input type="text" name="companyWebsite" className="quote-honey" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="locale" value={locale} />

      <div className="contact-form-row two">
        <label>
          <span>{t.nameLabel} *</span>
          <input name="name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          <span>{t.emailLabel} *</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
          {errors.email && <small>{errors.email}</small>}
        </label>
      </div>

      <label>
        <span>{t.phoneLabel}</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label>
        <span>{t.serviceLabel}</span>
        <select name="serviceType" defaultValue="">
          <option value="" disabled>
            {t.servicePlaceholder}
          </option>
          {t.serviceTypes.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>

      <label>
        <span>{t.messageLabel} *</span>
        <textarea name="message" rows={7} aria-invalid={Boolean(errors.message)} />
        {errors.message && <small>{errors.message}</small>}
      </label>

      {errors.form && <p className="contact-form-error">{errors.form}</p>}

      <button type="submit" className="contact-submit-button" disabled={status === "submitting"}>
        <Send size={18} />
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
