export type AnalyticsEventName =
  | "contact_submit_success"
  | "volunteer_submit_success"
  | "sponsor_submit_success"
  | "venue_link_click";

export function trackEvent(name: AnalyticsEventName, payload?: Record<string, unknown>) {
  const body = JSON.stringify({
    name,
    payload: payload ?? {},
    ts: new Date().toISOString(),
  });

  if (typeof window !== "undefined" && "sendBeacon" in navigator) {
    navigator.sendBeacon("/api/analytics", body);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // analytics errors should never block UX
  });
}
