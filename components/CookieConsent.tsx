"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./I18nProvider";

const CONSENT_KEY = "mandy-cookie-consent";

export default function CookieConsent() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  const choose = (value: "accepted" | "declined") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label={dict.cookieConsent.ariaLabel}>
      <p className="cookie-banner-text">{dict.cookieConsent.message}</p>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-button cookie-decline" onClick={() => choose("declined")}>
          {dict.cookieConsent.decline}
        </button>
        <button type="button" className="cookie-banner-button cookie-accept" onClick={() => choose("accepted")}>
          {dict.cookieConsent.accept}
        </button>
      </div>
    </div>
  );
}
