import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { escapeHtml, isValidEmail, MAX_FIELD_LENGTH, MAX_MESSAGE_LENGTH } from "@/lib/api-utils";
import { en } from "@/lib/dictionaries/en";
import { fr } from "@/lib/dictionaries/fr";

// Pick-up / delivery are dropdowns now, so accept only the cities the forms actually offer.
const ALLOWED_LOCATIONS = new Set<string>([...en.quote.locationOptions, ...fr.quote.locationOptions]);

type ApiLocale = "en" | "fr";

type QuotePayload = {
  fullName: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  requiredDeliveryTime: string;
  numberOfPallets: string;
  approximateWeight: string;
  dimensions: string;
  additionalNotes: string;
  companyWebsite: string;
  locale: ApiLocale;
};

const MESSAGES: Record<string, Record<ApiLocale, string>> = {
  rateLimited: {
    en: "Too many quote requests. Please try again later.",
    fr: "Trop de demandes de soumission. Veuillez réessayer plus tard."
  },
  invalidRequest: {
    en: "Invalid request. Please try again.",
    fr: "Demande invalide. Veuillez réessayer."
  },
  invalidEmail: {
    en: "Please enter a valid email address.",
    fr: "Veuillez entrer une adresse courriel valide."
  },
  invalidLocation: {
    en: "Please select a pick-up and delivery location from the list.",
    fr: "Veuillez choisir un lieu de cueillette et de livraison dans la liste."
  },
  contactRequired: {
    en: "Please provide a phone number or an email address.",
    fr: "Veuillez fournir un numéro de téléphone ou une adresse courriel."
  },
  tooLong: {
    en: "One or more fields are too long. Please shorten your request and try again.",
    fr: "Un ou plusieurs champs sont trop longs. Veuillez raccourcir votre demande et réessayer."
  },
  suspicious: {
    en: "Your request could not be accepted. Please remove links or unusual characters and try again.",
    fr: "Votre demande n'a pas pu être acceptée. Veuillez retirer les liens ou les caractères inhabituels et réessayer."
  },
  notConfigured: {
    en: "Quote email delivery is not configured yet. Please call 438-921-7268 or email info@mandyexpress.ca.",
    fr: "L'envoi de soumissions par courriel n'est pas encore configuré. Appelez au 438-921-7268 ou écrivez à info@mandyexpress.ca."
  },
  sendFailed: {
    en: "We could not send your quote request. Please call 438-921-7268 or email info@mandyexpress.ca.",
    fr: "Nous n'avons pas pu envoyer votre demande de soumission. Appelez au 438-921-7268 ou écrivez à info@mandyexpress.ca."
  }
};

const REQUIRED_FIELD_MESSAGES: Array<[keyof QuotePayload, Record<ApiLocale, string>]> = [
  ["fullName", { en: "Full name is required.", fr: "Le nom complet est requis." }],
  ["pickupLocation", { en: "Pick-up location is required.", fr: "Le lieu de cueillette est requis." }],
  ["deliveryLocation", { en: "Delivery location is required.", fr: "Le lieu de livraison est requis." }]
];

const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, maxRequests: 4 });
const isDevelopment = process.env.NODE_ENV !== "production";
const duplicateWindowMs = 10 * 60 * 1000;
const successfulSubmissions = new Map<string, number>();

function describeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: isDevelopment ? error.stack : undefined
    };
  }

  if (typeof error === "object" && error !== null) {
    return error;
  }

  return { message: String(error) };
}

function errorMessage(error: unknown) {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function logQuoteFailure(stage: string, details: Record<string, unknown>) {
  console.error(`[quote-api] ${stage}`, details);
}

function logRequestBody(body: Record<string, unknown>) {
  if (isDevelopment) {
    console.log("[quote-api] request body", body);
  }
}

function failureResponse(message: string, status: number, developmentMessage?: string) {
  return NextResponse.json(
    { error: isDevelopment && developmentMessage ? developmentMessage : message },
    { status }
  );
}

function submissionKey(payload: QuotePayload) {
  return [
    payload.fullName,
    payload.phone,
    payload.email,
    payload.pickupLocation,
    payload.deliveryLocation,
    payload.pickupDate,
    payload.requiredDeliveryTime,
    payload.numberOfPallets,
    payload.approximateWeight,
    payload.dimensions,
    payload.additionalNotes
  ].join("\u001f");
}

function hasSuccessfulSubmission(key: string) {
  const now = Date.now();

  Array.from(successfulSubmissions.entries()).forEach(([storedKey, expiresAt]) => {
    if (expiresAt <= now) {
      successfulSubmissions.delete(storedKey);
    }
  });

  const expiresAt = successfulSubmissions.get(key);
  return Boolean(expiresAt && expiresAt > now);
}

function rememberSuccessfulSubmission(key: string) {
  successfulSubmissions.set(key, Date.now() + duplicateWindowMs);
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatValue(value: string) {
  return escapeHtml(value || "Not provided").replace(/\n/g, "<br />");
}

function tableRows(rows: Array<[string, string]>) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f8fafc;font-weight:700;color:#0b2345;width:220px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#1f2937;">${formatValue(value)}</td>
        </tr>
      `
    )
    .join("");
}

function section(title: string, rows: Array<[string, string]>) {
  return `
    <h2 style="margin:26px 0 10px;color:#ff6a00;font-size:15px;letter-spacing:.04em;text-transform:uppercase;">${escapeHtml(title)}</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      ${tableRows(rows)}
    </table>
  `;
}

const maxConfirmationValueLength = 80;

function summarizeForConfirmation(value: string) {
  return value.length > maxConfirmationValueLength
    ? `${value.slice(0, maxConfirmationValueLength)}…`
    : value;
}

const CONFIRMATION_COPY: Record<
  ApiLocale,
  {
    subject: string;
    heading: string;
    greeting: string;
    paragraph1: string;
    paragraph2: string;
    summaryHeading: string;
    pickupLabel: string;
    deliveryLabel: string;
    onFileNote: string;
    contactHeading: string;
    phoneLabel: string;
    emailLabel: string;
    websiteLabel: string;
    tagline: string;
  }
> = {
  en: {
    subject: "We Received Your Quote Request — Mandy Express",
    heading: "We&rsquo;ve Received Your Quote Request",
    greeting: "Hello,",
    paragraph1:
      "Thank you for contacting Mandy Express. We received your quote request and our team will review your shipment details shortly.",
    paragraph2:
      "A Mandy Express team member will contact you soon to confirm the details and provide the next steps.",
    summaryHeading: "Quote Summary",
    pickupLabel: "Pickup location",
    deliveryLabel: "Delivery location",
    onFileNote: "The full details you submitted are on file with our team and will be confirmed with you directly.",
    contactHeading: "Contact Details",
    phoneLabel: "Phone:",
    emailLabel: "Email:",
    websiteLabel: "Website:",
    tagline: "More Than Cargo. Your Trust, Our Priority."
  },
  fr: {
    subject: "Nous avons reçu votre demande de soumission — Mandy Express",
    heading: "Nous avons bien re&ccedil;u votre demande de soumission",
    greeting: "Bonjour,",
    paragraph1:
      "Merci d'avoir contacté Mandy Express. Nous avons reçu votre demande de soumission et notre équipe examinera les détails de votre expédition sous peu.",
    paragraph2:
      "Un membre de l'équipe Mandy Express vous contactera bientôt pour confirmer les détails et vous indiquer les prochaines étapes.",
    summaryHeading: "Résumé de la demande",
    pickupLabel: "Lieu de cueillette",
    deliveryLabel: "Lieu de livraison",
    onFileNote:
      "Les renseignements complets que vous avez soumis sont conservés par notre équipe et seront confirmés avec vous directement.",
    contactHeading: "Coordonnées",
    phoneLabel: "Téléphone :",
    emailLabel: "Courriel :",
    websiteLabel: "Site Web :",
    tagline: "Plus qu'une cargaison. Votre confiance, notre priorité."
  }
};

function customerConfirmationHtml(payload: QuotePayload) {
  const copy = CONFIRMATION_COPY[payload.locale];
  return `
    <div style="margin:0;padding:0;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#0b2345;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f3f6fa;">
        <tr>
          <td style="padding:28px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;background:#0b2345;color:#ffffff;">
                  <p style="margin:0 0 8px;color:#ff6a00;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Mandy Express</p>
                  <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;">${copy.heading}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${copy.greeting}</p>
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${escapeHtml(copy.paragraph1)}</p>
                  <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">${escapeHtml(copy.paragraph2)}</p>

                  <h2 style="margin:0 0 12px;color:#ff6a00;font-size:15px;letter-spacing:.04em;text-transform:uppercase;">${escapeHtml(copy.summaryHeading)}</h2>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                    ${tableRows([
                      [copy.pickupLabel, summarizeForConfirmation(payload.pickupLocation)],
                      [copy.deliveryLabel, summarizeForConfirmation(payload.deliveryLocation)]
                    ])}
                  </table>
                  <p style="margin:12px 0 0;font-size:13px;line-height:1.5;color:#6b7280;">${escapeHtml(copy.onFileNote)}</p>

                  <div style="margin:26px 0 0;padding:18px 20px;background:#f8fafc;border-left:4px solid #ff6a00;">
                    <h2 style="margin:0 0 10px;color:#0b2345;font-size:17px;">${escapeHtml(copy.contactHeading)}</h2>
                    <p style="margin:0 0 6px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(copy.phoneLabel)}</strong> 438-921-7268</p>
                    <p style="margin:0 0 6px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(copy.emailLabel)}</strong> info@mandyexpress.ca</p>
                    <p style="margin:0;font-size:15px;line-height:1.5;"><strong>${escapeHtml(copy.websiteLabel)}</strong> <a href="https://mandyexpress.ca" style="color:#ff6a00;text-decoration:none;">https://mandyexpress.ca</a></p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 28px;background:#0b2345;color:#ffffff;text-align:center;">
                  <p style="margin:0;color:#ffffff;font-size:14px;">${escapeHtml(copy.tagline)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function hasSuspiciousContent(payload: QuotePayload) {
  const combined = [
    payload.fullName,
    payload.phone,
    payload.email,
    payload.pickupLocation,
    payload.deliveryLocation,
    payload.additionalNotes
  ].join(" ");

  return /<script|<\/a>|https?:\/\/|www\.|[\u0000-\u0008\u000B\u000C\u000E-\u001F]/i.test(combined);
}

function normalizePayload(body: Record<string, unknown>): QuotePayload {
  return {
    fullName: asString(body.fullName),
    phone: asString(body.phone),
    email: asString(body.email),
    pickupLocation: asString(body.pickupLocation),
    deliveryLocation: asString(body.deliveryLocation),
    pickupDate: asString(body.pickupDate),
    requiredDeliveryTime: asString(body.requiredDeliveryTime),
    numberOfPallets: asString(body.numberOfPallets),
    approximateWeight: asString(body.approximateWeight),
    dimensions: asString(body.dimensions),
    additionalNotes: asString(body.additionalNotes),
    companyWebsite: asString(body.companyWebsite),
    locale: body.locale === "fr" ? "fr" : "en"
  };
}

function validatePayload(payload: QuotePayload) {
  const locale = payload.locale;

  const missingField = REQUIRED_FIELD_MESSAGES.find(([key]) => !payload[key]);
  if (missingField) {
    return missingField[1][locale];
  }

  // Phone and email are each optional, but at least one is needed to reply to the customer.
  if (!payload.phone && !payload.email) {
    return MESSAGES.contactRequired[locale];
  }

  if (payload.email && !isValidEmail(payload.email)) {
    return MESSAGES.invalidEmail[locale];
  }

  if (!ALLOWED_LOCATIONS.has(payload.pickupLocation) || !ALLOWED_LOCATIONS.has(payload.deliveryLocation)) {
    return MESSAGES.invalidLocation[locale];
  }

  const valuesToCheck = Object.entries(payload).flatMap(([key, value]) => {
    if (key === "companyWebsite" || key === "additionalNotes") return [];
    return [value];
  });

  if (valuesToCheck.some((value) => value.length > MAX_FIELD_LENGTH) || payload.additionalNotes.length > MAX_MESSAGE_LENGTH) {
    return MESSAGES.tooLong[locale];
  }

  if (hasSuspiciousContent(payload)) {
    return MESSAGES.suspicious[locale];
  }

  return "";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch (error) {
    logQuoteFailure("invalid json", { ip, error: describeError(error) });
    return failureResponse(MESSAGES.invalidRequest.en, 400, errorMessage(error));
  }

  logRequestBody(body);

  const payload = normalizePayload(body);
  const locale = payload.locale;

  if (isRateLimited(ip)) {
    logQuoteFailure("rate limit exceeded", { ip });
    return failureResponse(MESSAGES.rateLimited[locale], 429);
  }

  if (payload.companyWebsite) {
    logQuoteFailure("honeypot triggered", { ip, requestBody: body });
    return NextResponse.json({ ok: true });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    logQuoteFailure("validation failed", { ip, requestBody: body, validationError });
    return failureResponse(validationError, 400, validationError);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  const missingEnvironmentVariables = [
    !resendApiKey ? "RESEND_API_KEY" : "",
    !to ? "QUOTE_TO_EMAIL" : "",
    !from ? "RESEND_FROM_EMAIL" : ""
  ].filter(Boolean);

  if (missingEnvironmentVariables.length) {
    logQuoteFailure("missing environment variables", {
      missingEnvironmentVariables,
      usingQuoteToFallback: false,
      usingFromFallback: false
    });
  }

  if (!resendApiKey || !to || !from) {
    return failureResponse(
      MESSAGES.notConfigured[locale],
      503,
      `Missing environment variables: ${missingEnvironmentVariables.join(", ")}`
    );
  }

  const key = submissionKey(payload);

  if (hasSuccessfulSubmission(key)) {
    console.log("[quote-api] duplicate quote submission ignored");
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const resend = new Resend(resendApiKey);
  const submittedAt = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "America/Toronto"
  }).format(new Date());

  const companySubject = `New Quote Request — ${payload.fullName} — ${payload.pickupLocation} to ${payload.deliveryLocation}`;
  const companyHtml = `
    <div style="margin:0;padding:24px;background:#f3f6fa;font-family:Arial,sans-serif;color:#1f2937;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
        <div style="padding:22px 26px;background:#0b2345;color:#ffffff;">
          <h1 style="margin:0 0 8px;font-size:24px;line-height:1.2;">New Mandy Express Quote Request</h1>
          <p style="margin:0;color:#f97316;font-weight:700;">Reply to this email to contact the customer.</p>
        </div>
        <div style="padding:24px 26px;">
          <p style="margin:0 0 18px;"><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
          ${section("Customer Information", [
            ["Name", payload.fullName],
            ["Phone", payload.phone],
            ["Email", payload.email]
          ])}
          ${section("Shipment Information", [
            ["Pickup location", payload.pickupLocation],
            ["Delivery location", payload.deliveryLocation],
            ["Service date", payload.pickupDate],
            ["Required delivery time", payload.requiredDeliveryTime]
          ])}
          ${section("Cargo Details", [
            ["Number of pallets", payload.numberOfPallets],
            ["Approximate weight", payload.approximateWeight],
            ["Dimensions", payload.dimensions]
          ])}
          ${section("Additional Notes", [["Notes", payload.additionalNotes]])}
        </div>
      </div>
    </div>
  `;
  const customerHtml = customerConfirmationHtml(payload);

  // The customer may have left email blank (phone-only request) — in that case there is
  // nobody to send the confirmation to, and replyTo must be omitted rather than sent empty.
  const companyEmail = {
    from,
    to: [to],
    subject: companySubject,
    html: companyHtml,
    ...(payload.email ? { replyTo: payload.email } : {})
  };
  const emailsToSend = payload.email
    ? [
        companyEmail,
        {
          from,
          to: [payload.email],
          replyTo: "info@mandyexpress.ca",
          subject: CONFIRMATION_COPY[locale].subject,
          html: customerHtml
        }
      ]
    : [companyEmail];

  try {
    const resendResponse = await resend.batch.send(emailsToSend);

    console.log("[quote-api] Resend batch response", JSON.stringify(resendResponse));

    const { error } = resendResponse;

    if (error) {
      logQuoteFailure("resend batch returned error", {
        requestBody: isDevelopment ? body : undefined,
        resendError: error,
        from,
        companyTo: to,
        customerTo: payload.email
      });

      return failureResponse(
        "We could not send your quote request. Please call 438-921-7268 or email info@mandyexpress.ca.",
        502,
        errorMessage(error)
      );
    }

    rememberSuccessfulSubmission(key);
    return NextResponse.json({ ok: true });
  } catch (error) {
    logQuoteFailure("caught exception", {
      requestBody: isDevelopment ? body : undefined,
      error: describeError(error),
      from,
      companyTo: to,
      customerTo: payload.email
    });

    return failureResponse(
      MESSAGES.sendFailed[locale],
      502,
      errorMessage(error)
    );
  }
}
