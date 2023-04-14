/** @type {import('tailwindcss').Config} */
export const content = [
  "./components/**/*.{js,vue,ts}",
  "./layouts/**/*.vue",
  "./pages/**/*.vue",
  "./plugins/**/*.{js,ts}",
  "./nuxt.config.{js,ts}",
];
export const theme = {
  extend: {
    boxShadow: {
      '3xl': '0px 0px 60px 0px rgba(0, 0, 0, 0.3)',
    }
  },
};
export const plugins = [require('@tailwindcss/typography'), require('@tailwindcss/forms')];