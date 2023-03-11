/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141625",
        secondary: "#1e2139",
        purple: "#7c5dfa",
      },
    },
  },
  plugins: [],
};
