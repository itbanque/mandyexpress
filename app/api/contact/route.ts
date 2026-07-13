import { NextRequest, NextResponse } from "next/server";

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateEntry>();
const windowMs = 10 * 60 * 1000;
const maxRequests = 5;

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

function sanitize(value: FormDataEntryValue | null) {
  return String(value || "").trim();
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

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const formData = await request.formData();
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
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || "info@mandyexpress.ca";
  const from = process.env.CONTACT_EMAIL_FROM || "Mandy Express Website <onboarding@resend.dev>";

  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          "Email delivery is not configured yet. Please call 514-623-5486 or email info@mandyexpress.ca directly."
      },
      { status: 503 }
    );
  }

  const html = `
    <h2>New Mandy Express Contact Message</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || "Not provided")}</td></tr>
      <tr><td><strong>Service Type</strong></td><td>${escapeHtml(serviceType || "Not selected")}</td></tr>
      <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replace(/\n/g, "<br />")}</td></tr>
    </table>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: "New Mandy Express Contact Message",
      html
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "We could not send your message. Please call 514-623-5486 or email info@mandyexpress.ca." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
