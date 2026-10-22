"use client";

import { useEffect } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

function getClickEvent(anchor: HTMLAnchorElement): {
  name: string;
  params: Record<string, string>;
} | null {
  const href = anchor.getAttribute("href") ?? "";
  const normalizedHref = href.toLowerCase();
  const linkText = anchor.textContent?.trim().replace(/\s+/g, " ").slice(0, 100);

  if (anchor.hasAttribute("download")) {
    return {
      name: "file_download_click",
      params: { ...(linkText ? { link_text: linkText } : {}), link_url: href },
    };
  }

  if (normalizedHref.startsWith("mailto:")) {
    return { name: "email_click", params: {} };
  }

  if (normalizedHref.includes("github.com")) {
    return {
      name: "github_click",
      params: { ...(linkText ? { link_text: linkText } : {}), link_url: href },
    };
  }

  if (normalizedHref.includes("linkedin.com")) {
    return {
      name: "linkedin_click",
      params: { ...(linkText ? { link_text: linkText } : {}), link_url: href },
    };
  }

  if (href.startsWith("#contact")) {
    return {
      name: "contact_click",
      params: linkText ? { link_text: linkText } : {},
    };
  }

  return null;
}

export function GoogleAnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const anchor = event.target.closest("a");
      if (!anchor) return;

      const analyticsEvent = getClickEvent(anchor);
      if (analyticsEvent) {
        trackAnalyticsEvent(analyticsEvent.name, analyticsEvent.params);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
