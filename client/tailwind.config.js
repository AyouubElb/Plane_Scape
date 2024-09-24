/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          100: "#e7dcff",
          200: "#e6e0eb",
          300: "#4b0097",
        },
        lightGrey: "#f6f4f8",
        darkGrey: "#555555",
      },
      boxShadow: {
        buttonShadow: "4px 4px 10px 1px rgb(0 0 0 / 0.25)",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      minHeight: {
        auto: "auto",
      },
    },
  },
  plugins: [],
};
