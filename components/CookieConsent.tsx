"use client";

import { useSyncExternalStore } from "react";
import { useI18n } from "./I18nProvider";

const CONSENT_KEY = "mandy-cookie-consent";

// The stored choice lives in localStorage, which React treats as an external store.
// Reading it through useSyncExternalStore keeps the banner's visibility derived from
// the browser instead of pushed in with a setState inside an effect.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function notify() {
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  return window.localStorage.getItem(CONSENT_KEY);
}

// There is no localStorage on the server, so report a stored choice: the banner stays
// out of the SSR markup and appears only once the client knows nothing was saved.
function getServerSnapshot() {
  return "unknown";
}

export default function CookieConsent() {
  const { dict } = useI18n();
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = (value: "accepted" | "declined") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    notify();
  };

  if (consent !== null) {
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
