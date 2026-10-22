type AnalyticsParams = Readonly<Record<string, string>>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params: AnalyticsParams) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  params: AnalyticsParams = {},
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
