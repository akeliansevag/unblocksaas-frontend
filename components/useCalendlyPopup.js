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

const BOOK_FIT_CALL_EVENT = "book_your_free_fit_call_click";
const BOOK_FIT_CALL_SESSION_KEY = "unblocksaas_book_fit_call_click_tracked";

function trackBookFitCallClick() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (window.sessionStorage?.getItem(BOOK_FIT_CALL_SESSION_KEY)) {
      return;
    }

    window.sessionStorage?.setItem(BOOK_FIT_CALL_SESSION_KEY, "true");
  } catch {
    // If storage is unavailable, still allow the click event to be tracked.
  }

  const eventPayload = {
    event: BOOK_FIT_CALL_EVENT,
    event_name: "Book Your Free Fit Call",
    tracking_action: "Clicks",
    counting_method: "Unique clicks",
    button_text: "Book Your Free Fit Call",
    page_location: window.location.href,
    page_path: window.location.pathname,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);
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
      trackBookFitCallClick();

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
