/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#061b3a",
        ink: "#111827",
        bluebrand: "#2563eb",
      },
      boxShadow: {
        card: "0 10px 24px rgba(15, 23, 42, 0.08)",
        soft: "0 18px 50px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};
