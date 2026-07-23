import { NextRequest } from "next/server";

type RateEntry = {
  count: number;
  resetAt: number;
};

type RateLimiterOptions = {
  windowMs: number;
  maxRequests: number;
  maxEntries?: number;
};

// Clients can freely prepend values to x-forwarded-for; only the entry
// appended by the platform's own reverse proxy (the rightmost one) reflects
// the connection it actually saw. x-vercel-forwarded-for is set by Vercel
// itself and cannot be spoofed. x-real-ip is last because platforms that do
// not explicitly set it may pass a client-supplied value through.
export function getClientIp(request: NextRequest) {
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const entries = forwardedFor.split(",");
    return entries[entries.length - 1]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

// In-memory limiter: per-instance only, so on serverless deployments each
// instance counts separately. Swap the internals for a persistent store
// (e.g. Upstash Ratelimit) if this ever runs on Vercel with real traffic.
export function createRateLimiter({ windowMs, maxRequests, maxEntries = 5000 }: RateLimiterOptions) {
  const entries = new Map<string, RateEntry>();

  function makeRoom(now: number) {
    entries.forEach((entry, key) => {
      if (entry.resetAt <= now) {
        entries.delete(key);
      }
    });

    // Map iterates in insertion order, so the first keys are the oldest.
    while (entries.size >= maxEntries) {
      const oldestKey = entries.keys().next().value;
      if (oldestKey === undefined) break;
      entries.delete(oldestKey);
    }
  }

  return function isRateLimited(ip: string) {
    const now = Date.now();
    const current = entries.get(ip);

    if (!current || current.resetAt <= now) {
      if (entries.size >= maxEntries) {
        makeRoom(now);
      }
      entries.set(ip, { count: 1, resetAt: now + windowMs });
      return false;
    }

    current.count += 1;
    return current.count > maxRequests;
  };
}
