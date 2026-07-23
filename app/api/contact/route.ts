import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createRateLimiter, getClientIp } from "@/lib/rate-limit";
import { escapeHtml, isValidEmail, MAX_FIELD_LENGTH, MAX_MESSAGE_LENGTH } from "@/lib/api-utils";

const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, maxRequests: 5 });

type ApiLocale = "en" | "fr";

const MESSAGES: Record<string, Record<ApiLocale, string>> = {
  rateLimited: {
    en: "Too many messages. Please try again later.",
    fr: "Trop de messages. Veuillez réessayer plus tard."
  },
  missingFields: {
    en: "Name, email, and message are required.",
    fr: "Le nom, le courriel et le message sont requis."
  },
  invalidEmail: {
    en: "Please enter a valid email address.",
    fr: "Veuillez entrer une adresse courriel valide."
  },
  tooLong: {
    en: "One or more fields are too long. Please shorten your message and try again.",
    fr: "Un ou plusieurs champs sont trop longs. Veuillez raccourcir votre message et réessayer."
  },
  notConfigured: {
    en: "Email delivery is not configured yet. Please call 514-623-5486 or email info@mandyexpress.ca directly.",
    fr: "L'envoi de courriels n'est pas encore configuré. Appelez au 514-623-5486 ou écrivez directement à info@mandyexpress.ca."
  },
  sendFailed: {
    en: "We could not send your message. Please call 514-623-5486 or email info@mandyexpress.ca.",
    fr: "Nous n'avons pas pu envoyer votre message. Appelez au 514-623-5486 ou écrivez à info@mandyexpress.ca."
  }
};

function sanitize(value: FormDataEntryValue | null) {
  return String(value || "").trim();
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const formData = await request.formData();
  const locale: ApiLocale = sanitize(formData.get("locale")) === "fr" ? "fr" : "en";
  const t = (key: keyof typeof MESSAGES) => MESSAGES[key][locale];

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: t("rateLimited") }, { status: 429 });
  }

  const honey = sanitize(formData.get("companyWebsite"));

  if (honey) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(formData.get("name"));
  const email = sanitize(formData.get("email"));
  const phone = sanitize(formData.get("phone"));
  const serviceType = sanitize(formData.get("serviceType"));
  const message = sanitize(formData.get("message"));

  if (!name || !email || !message) {
    return NextResponse.json({ error: t("missingFields") }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: t("invalidEmail") }, { status: 400 });
  }

  const fieldsTooLong =
    [name, email, phone, serviceType].some((value) => value.length > MAX_FIELD_LENGTH) ||
    message.length > MAX_MESSAGE_LENGTH;

  if (fieldsTooLong) {
    return NextResponse.json({ error: t("tooLong") }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || "info@mandyexpress.ca";
  const from = process.env.CONTACT_EMAIL_FROM || "Mandy Express Website <onboarding@resend.dev>";

  if (!resendApiKey) {
    return NextResponse.json({ error: t("notConfigured") }, { status: 503 });
  }

  const html = `
    <h2>New Mandy Express Contact Message</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "Not provided")}</td></tr>
      <tr><td><strong>Service Type</strong></td><td>${escapeHtml(serviceType || "Not selected")}</td></tr>
      <tr><td><strong>Preferred Language</strong></td><td>${locale === "fr" ? "French" : "English"}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replace(/\n/g, "<br />")}</td></tr>
    </table>
  `;

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "New Mandy Express Contact Message",
      html
    });

    if (error) {
      return NextResponse.json({ error: t("sendFailed") }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: t("sendFailed") }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
