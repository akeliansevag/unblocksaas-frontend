"use client";

import Script from "next/script";

export default function CalendlyScriptLoader() {
  return (
    <Script
      id="calendly-widget"
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
    />
  );
}
