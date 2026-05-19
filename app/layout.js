import "./globals.css";

export const metadata = {
  title: "Unblocksaas | 3-Day Revenue Diagnostic",
  description: "A focused 3-day diagnostic to uncover what's blocking B2B SaaS revenue conversion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
