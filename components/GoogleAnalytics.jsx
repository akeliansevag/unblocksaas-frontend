import Script from "next/script";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-27K42MVKG8";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18204123400";

export default function GoogleAnalytics() {
  const tagIds = [GOOGLE_ADS_ID, GA_MEASUREMENT_ID].filter(Boolean);
  const primaryTagId = tagIds[0];

  if (!primaryTagId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryTagId}`}
        strategy="beforeInteractive"
      />
      <Script id="google-tag" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${tagIds.map((tagId) => `gtag('config', '${tagId}');`).join("\n          ")}
        `}
      </Script>
    </>
  );
}
