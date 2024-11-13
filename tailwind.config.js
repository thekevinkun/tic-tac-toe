/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "shades-black": "#121212",
        "bone-white": "#FFF8DC",
        "blood-red": "#880808",
      },
      fontFamily: {
        "press-start": "var(--font-press-start)",
      },
    },
  },
  plugins: [],
};
