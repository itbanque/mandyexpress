"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Clock3, FileText, MapPin, Package, Send, User, X } from "lucide-react";

const goodsTypes = [
  "Apparel / Garments",
  "Retail Products",
  "Samples",
  "Cartons",
  "Palletized Freight",
  "Other"
];

const specialRequirements = [
  "Liftgate Service",
  "Inside Delivery",
  "Residential Delivery",
  "Limited Access",
  "Special Handling / Fragile"
];

export default function QuoteModal() {
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
      companyWebsite: getValue("companyWebsite")
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
        throw new Error(typeof result.error === "string" ? result.error : "We could not send the request.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send the request. Please email info@mandyexpress.ca or call 514-623-5486."
      );
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
              <h2 id="quote-modal-title">Request a Quote</h2>
              <p>Fast. Reliable. Same-Day Delivery. Toronto ↔ Montreal Along Highway 401</p>
            </div>
          </div>
          <button type="button" className="quote-close-button" aria-label="Close quote form" onClick={closeModal}>
            <X size={24} />
          </button>
        </div>

        {status === "success" ? (
          <div className="quote-success">
            <CheckCircle2 size={54} />
            <h3>Request Sent</h3>
            <p>Thank you. Your quote request has been sent to info@mandyexpress.ca.</p>
            <button type="button" className="quote-button inline-flex" onClick={closeModal}>
              Close
            </button>
          </div>
        ) : (
          <form
            className="quote-form"
            onSubmit={handleSubmit}
          >
            <input type="text" name="companyWebsite" className="quote-honey" tabIndex={-1} autoComplete="off" />

            <section className="quote-panel">
              <h3><User size={21} /> Contact Information</h3>
              <div className="quote-field-grid two-cols">
                <label>
                  Full Name <span>*</span>
                  <input name="fullName" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Company Name <span>*</span>
                  <input name="company" type="text" placeholder="Company name" required />
                </label>
                <label>
                  Phone Number <span>*</span>
                  <input name="phone" type="tel" placeholder="(514) 123-4567" required />
                </label>
                <label>
                  Email Address <span>*</span>
                  <input name="email" type="email" placeholder="you@example.com" required />
                </label>
              </div>
            </section>

            <section className="quote-panel">
              <h3><MapPin size={21} /> Shipment Information</h3>
              <div className="quote-field-grid two-cols">
                <label>
                  Pick-up Location <span>*</span>
                  <input name="pickupLocation" type="text" placeholder="Enter pick-up address" required />
                </label>
                <label>
                  Delivery Location <span>*</span>
                  <input name="deliveryLocation" type="text" placeholder="Enter delivery address" required />
                </label>
                <label>
                  Pick-up Date <span>*</span>
                  <input name="pickupDate" type="date" required />
                </label>
                <label>
                  Required Delivery Time <span>*</span>
                  <select name="requiredDeliveryTime" required>
                    <option value="">Select delivery time</option>
                    <option>Same-Day Delivery</option>
                    <option>Next-Day Delivery</option>
                    <option>Flexible Delivery</option>
                    <option>Morning Delivery</option>
                    <option>Afternoon Delivery</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="quote-panel">
              <h3><Package size={21} /> Additional Details</h3>
              <label className="quote-full-label">
                Type of Goods <span>*</span>
              </label>
              <div className="goods-grid">
                {goodsTypes.map((type) => (
                  <label key={type} className="choice-card">
                    <input type="radio" name="typeOfGoods" value={type} required />
                    <span>{type}</span>
                  </label>
                ))}
              </div>

              <div className="quote-field-grid two-cols details-grid">
                <label>
                  Number of Pallets <span>*</span>
                  <input name="numberOfPallets" type="number" min="0" placeholder="Select pallet quantity" required />
                </label>
                <label>
                  Approximate Weight <span>*</span>
                  <input name="approximateWeight" type="text" placeholder="Enter weight in lbs" required />
                </label>
                <label className="span-two">
                  Dimensions
                  <input name="dimensions" type="text" placeholder="L x W x H (inches)" />
                </label>
              </div>
            </section>

            <section className="quote-panel">
              <h3><Clock3 size={21} /> Special Requirements</h3>
              <div className="requirements-grid">
                {specialRequirements.map((requirement) => (
                  <label key={requirement}>
                    <input type="checkbox" name="specialRequirements" value={requirement} />
                    {requirement}
                  </label>
                ))}
              </div>
            </section>

            <section className="quote-panel notes-panel">
              <h3><FileText size={21} /> Additional Notes</h3>
              <label>
                Additional Notes
                <textarea name="additionalNotes" placeholder="Write your message here..." rows={5} />
              </label>
            </section>

            {status === "error" && <p className="quote-error">{errorMessage}</p>}

            <button className="quote-submit-button" type="submit" disabled={status === "submitting"}>
              <Send size={20} />
              {status === "submitting" ? "SENDING..." : "Submit Request"}
            </button>
            <p className="quote-secure">Your information is secure and will only be used to respond to your request.</p>
          </form>
        )}
      </div>
    </div>
  );
}
