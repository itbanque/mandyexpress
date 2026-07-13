"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";

const serviceTypes = [
  "Same-Day Delivery",
  "Daily Freight Service",
  "Door-to-Door Service",
  "Dedicated Cargo Van",
  "Moving Service",
  "Other"
];

type FormErrors = Partial<Record<"name" | "email" | "message" | "form", string>>;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
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

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!message) nextErrors.message = "Please enter your message.";

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
        throw new Error(data?.error || "Message could not be sent.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "We could not send your message. Please call 514-623-5486 or email info@mandyexpress.ca."
      });
    }
  };

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <CheckCircle2 size={54} />
        <h3>Message Sent</h3>
        <p>Thank you. We received your message and will respond as soon as possible.</p>
        <button type="button" className="quote-button inline-flex" onClick={() => setStatus("idle")}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input type="text" name="companyWebsite" className="quote-honey" tabIndex={-1} autoComplete="off" />

      <div className="contact-form-row two">
        <label>
          <span>Your Name *</span>
          <input name="name" type="text" autoComplete="name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <small>{errors.name}</small>}
        </label>
        <label>
          <span>Email Address *</span>
          <input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
          {errors.email && <small>{errors.email}</small>}
        </label>
      </div>

      <label>
        <span>Phone Number</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <label>
        <span>Type of Service</span>
        <select name="serviceType" defaultValue="">
          <option value="" disabled>
            Type of Service
          </option>
          {serviceTypes.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>

      <label>
        <span>Your Message *</span>
        <textarea name="message" rows={7} aria-invalid={Boolean(errors.message)} />
        {errors.message && <small>{errors.message}</small>}
      </label>

      {errors.form && <p className="contact-form-error">{errors.form}</p>}

      <button type="submit" className="contact-submit-button" disabled={status === "submitting"}>
        <Send size={18} />
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
