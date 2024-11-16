/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "matte-black": "#28282B",
        "bone-white": "#FFF8DC",
        "blood-red": "#880808",
        "neon-silver": "#c9c9c9",
        "secondary-black": "#121212",
      },
      fontFamily: {
        "press-start": "var(--font-press-start)",
      },
    },
  },
  plugins: [],
};
