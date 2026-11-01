import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 0px 60px 0px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [typography, forms],
};
