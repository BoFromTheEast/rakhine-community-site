import { headers } from "next/headers";

type RateBucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 8;

const buckets = new Map<string, RateBucket>();

function now() {
  return Date.now();
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  const email = normalizeEmail(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function isSafeText(value: string, max = 2000) {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max;
}

export async function getClientIp() {
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  if (forwardedFor) {
    const [first] = forwardedFor.split(",");
    return first.trim();
  }

  const realIp = h.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

export async function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost = new URL(request.url).host;
    return originHost === requestHost;
  } catch {
    return false;
  }
}

export function checkRateLimit(key: string) {
  const ts = now();
  const bucket = buckets.get(key);

  if (!bucket || ts >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: ts + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0 };
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return { ok: true, remaining: MAX_REQUESTS - bucket.count };
}

export function checkHoneypot(value?: string) {
  return !value || value.trim() === "";
}

export async function enforceFormSecurity(request: Request, formName: string) {
  const sameOrigin = await isSameOrigin(request);
  if (!sameOrigin) {
    return {
      ok: false,
      status: 403,
      error: "Invalid request origin.",
    };
  }

  const ip = await getClientIp();
  const rate = checkRateLimit(`${formName}:${ip}`);

  if (!rate.ok) {
    return {
      ok: false,
      status: 429,
      error: "Too many requests. Please wait and try again.",
    };
  }

  return { ok: true };
}
