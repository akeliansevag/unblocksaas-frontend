import "./globals.css";
import GoogleAnalytics from "../components/GoogleAnalytics";
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript,
} from "../components/GoogleTagManager";
import MetaPixel from "../components/MetaPixel";

export const metadata = {
  title: "Unblocksaas | 3-Day Revenue Diagnostic",
  description: "A focused 3-day diagnostic to uncover what's blocking B2B SaaS revenue conversion.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManagerScript />
        <GoogleAnalytics />
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </head>
      <body>
        <GoogleTagManagerNoScript />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
