/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E63946", // Bold Red
        background: "#FFFFFF", // Clean White
        text: "#111111", // Almost Black for contrast
        textLight: "#FFFFFF", // White text
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
