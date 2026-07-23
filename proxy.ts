import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qParam ? Number.parseFloat(qParam.split("=")[1]) : 1;
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((lang) => lang.tag)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) {
      return base;
    }
  }

  return defaultLocale;
}

const REWRITE_MARKER = "x-locale-rewrite";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return;
  }

  // Canonical English URLs are unprefixed: /en/... redirects to /...
  // In dev the proxy runs again on our own /en rewrite — the marker header
  // identifies that re-entry, which must pass through instead of redirecting
  // (otherwise / → /en → / loops forever).
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (request.headers.get(REWRITE_MARKER) === "1") {
      return;
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return;
  }

  // Unprefixed path: honour the saved choice, else the browser language.
  // Only full page loads get redirected — client-side RSC/prefetch fetches
  // (sec-fetch-dest: empty) are rewritten silently, otherwise the redirect
  // breaks soft navigation with "Failed to fetch RSC payload" errors.
  const fetchDest = request.headers.get("sec-fetch-dest");
  const isPageLoad = !fetchDest || fetchDest === "document";

  if (isPageLoad && preferredLocale(request) === "fr") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/fr" : `/fr${pathname}`;
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  const headers = new Headers(request.headers);
  headers.set(REWRITE_MARKER, "1");
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};
