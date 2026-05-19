"use client";

import { useCallback, useRef, useState } from "react";

function isValidUrl(url) {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export default function useCalendlyPopup() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  const [bookingMessage, setBookingMessage] = useState("");
  const isOpeningRef = useRef(false);

  const showFallback = useCallback((message) => {
    setBookingMessage(message);
    document.getElementById("book-call")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const openCalendlyPopup = useCallback(
    (event) => {
      event?.preventDefault();

      if (!isValidUrl(calendlyUrl)) {
        showFallback("Booking is temporarily unavailable. Please add a valid NEXT_PUBLIC_CALENDLY_URL to enable scheduling.");
        return;
      }

      if (typeof window === "undefined" || !window.Calendly?.initPopupWidget) {
        showFallback("The booking calendar is still loading. Please try again in a moment.");
        return;
      }

      if (isOpeningRef.current || document.querySelector(".calendly-overlay")) {
        return;
      }

      setBookingMessage("");
      isOpeningRef.current = true;
      window.Calendly.initPopupWidget({ url: calendlyUrl });
      window.setTimeout(() => {
        isOpeningRef.current = false;
      }, 1500);
    },
    [calendlyUrl, showFallback]
  );

  return { bookingMessage, openCalendlyPopup };
}
