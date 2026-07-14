import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type RateEntry = {
  count: number;
  resetAt: number;
};

type QuotePayload = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  requiredDeliveryTime: string;
  typeOfGoods: string;
  numberOfPallets: string;
  approximateWeight: string;
  dimensions: string;
  specialRequirements: string[];
  additionalNotes: string;
  companyWebsite: string;
};

const rateLimit = new Map<string, RateEntry>();
const windowMs = 10 * 60 * 1000;
const maxRequests = 4;
const maxFieldLength = 500;
const maxNotesLength = 3000;
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

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || current.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequests;
}

function submissionKey(payload: QuotePayload) {
  return [
    payload.fullName,
    payload.company,
    payload.phone,
    payload.email,
    payload.pickupLocation,
    payload.deliveryLocation,
    payload.pickupDate,
    payload.requiredDeliveryTime,
    payload.typeOfGoods,
    payload.numberOfPallets,
    payload.approximateWeight,
    payload.dimensions,
    payload.specialRequirements.join("|"),
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

function asStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }

  const singleValue = asString(value);
  return singleValue ? [singleValue] : [];
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function customerConfirmationHtml(payload: QuotePayload) {
  return `
    <div style="margin:0;padding:0;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#0b2345;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f3f6fa;">
        <tr>
          <td style="padding:28px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
              <tr>
                <td style="padding:24px 28px;background:#0b2345;color:#ffffff;">
                  <p style="margin:0 0 8px;color:#ff6a00;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Mandy Express</p>
                  <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;">We&rsquo;ve Received Your Quote Request</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Hello ${formatValue(payload.fullName)},</p>
                  <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Thank you for contacting Mandy Express. We received your quote request and our team will review your shipment details shortly.</p>
                  <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">A Mandy Express team member will contact you soon to confirm the details and provide the next steps.</p>

                  <h2 style="margin:0 0 12px;color:#ff6a00;font-size:15px;letter-spacing:.04em;text-transform:uppercase;">Quote Summary</h2>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                    ${tableRows([
                      ["Pickup location", payload.pickupLocation],
                      ["Delivery location", payload.deliveryLocation],
                      ["Pickup date", payload.pickupDate],
                      ["Required delivery time", payload.requiredDeliveryTime],
                      ["Type of goods", payload.typeOfGoods],
                      ["Number of pallets", payload.numberOfPallets],
                      ["Approximate weight", payload.approximateWeight]
                    ])}
                  </table>

                  <div style="margin:26px 0 0;padding:18px 20px;background:#f8fafc;border-left:4px solid #ff6a00;">
                    <h2 style="margin:0 0 10px;color:#0b2345;font-size:17px;">Contact Details</h2>
                    <p style="margin:0 0 6px;font-size:15px;line-height:1.5;"><strong>Phone:</strong> 514-623-5486</p>
                    <p style="margin:0 0 6px;font-size:15px;line-height:1.5;"><strong>Email:</strong> info@mandyexpress.ca</p>
                    <p style="margin:0;font-size:15px;line-height:1.5;"><strong>Website:</strong> <a href="https://mandyexpress.ca" style="color:#ff6a00;text-decoration:none;">https://mandyexpress.ca</a></p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 28px;background:#0b2345;color:#ffffff;text-align:center;">
                  <p style="margin:0;color:#ffffff;font-size:14px;">More Than Cargo. Your Trust, Our Priority.</p>
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
    payload.company,
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
    company: asString(body.company),
    phone: asString(body.phone),
    email: asString(body.email),
    pickupLocation: asString(body.pickupLocation),
    deliveryLocation: asString(body.deliveryLocation),
    pickupDate: asString(body.pickupDate),
    requiredDeliveryTime: asString(body.requiredDeliveryTime),
    typeOfGoods: asString(body.typeOfGoods),
    numberOfPallets: asString(body.numberOfPallets),
    approximateWeight: asString(body.approximateWeight),
    dimensions: asString(body.dimensions),
    specialRequirements: asStringArray(body.specialRequirements),
    additionalNotes: asString(body.additionalNotes),
    companyWebsite: asString(body.companyWebsite)
  };
}

function validatePayload(payload: QuotePayload) {
  const requiredFields: Array<[keyof QuotePayload, string]> = [
    ["fullName", "Full name"],
    ["company", "Company"],
    ["phone", "Phone"],
    ["email", "Email"],
    ["pickupLocation", "Pick-up location"],
    ["deliveryLocation", "Delivery location"]
  ];

  const missingField = requiredFields.find(([key]) => !payload[key]);
  if (missingField) {
    return `${missingField[1]} is required.`;
  }

  if (!isValidEmail(payload.email)) {
    return "Please enter a valid email address.";
  }

  const valuesToCheck = Object.entries(payload).flatMap(([key, value]) => {
    if (key === "companyWebsite" || key === "additionalNotes") return [];
    return Array.isArray(value) ? value : [value];
  });

  if (valuesToCheck.some((value) => value.length > maxFieldLength) || payload.additionalNotes.length > maxNotesLength) {
    return "One or more fields are too long. Please shorten your request and try again.";
  }

  if (hasSuspiciousContent(payload)) {
    return "Your request could not be accepted. Please remove links or unusual characters and try again.";
  }

  return "";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    logQuoteFailure("rate limit exceeded", { ip });
    return failureResponse("Too many quote requests. Please try again later.", 429);
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch (error) {
    logQuoteFailure("invalid json", { ip, error: describeError(error) });
    return failureResponse("Invalid request. Please try again.", 400, errorMessage(error));
  }

  logRequestBody(body);

  const payload = normalizePayload(body);

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
      "Quote email delivery is not configured yet. Please call 514-623-5486 or email info@mandyexpress.ca.",
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
  const requirements = payload.specialRequirements.length ? payload.specialRequirements.join(", ") : "None selected";
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
            ["Company", payload.company],
            ["Phone", payload.phone],
            ["Email", payload.email]
          ])}
          ${section("Shipment Information", [
            ["Pickup location", payload.pickupLocation],
            ["Delivery location", payload.deliveryLocation],
            ["Pickup date", payload.pickupDate],
            ["Required delivery time", payload.requiredDeliveryTime]
          ])}
          ${section("Cargo Details", [
            ["Type of goods", payload.typeOfGoods],
            ["Number of pallets", payload.numberOfPallets],
            ["Approximate weight", payload.approximateWeight],
            ["Dimensions", payload.dimensions]
          ])}
          ${section("Special Requirements", [["Selected requirements", requirements]])}
          ${section("Additional Notes", [["Notes", payload.additionalNotes]])}
        </div>
      </div>
    </div>
  `;
  const customerHtml = customerConfirmationHtml(payload);

  try {
    const resendResponse = await resend.batch.send([
      {
        from,
        to: [to],
        replyTo: payload.email,
        subject: companySubject,
        html: companyHtml
      },
      {
        from,
        to: [payload.email],
        replyTo: "info@mandyexpress.ca",
        subject: "We Received Your Quote Request — Mandy Express",
        html: customerHtml
      }
    ]);

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
        "We could not send your quote request. Please call 514-623-5486 or email info@mandyexpress.ca.",
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
      "We could not send your quote request. Please call 514-623-5486 or email info@mandyexpress.ca.",
      502,
      errorMessage(error)
    );
  }
}
