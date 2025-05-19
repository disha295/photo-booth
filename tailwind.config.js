/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', "sans-serif"], // Optional
      },
      boxShadow: {
        glow: "0 0 10px rgba(255, 192, 203, 0.5)", // for soft glow
      },
    },
  },
  plugins: [],
};
