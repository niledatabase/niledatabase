/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-aeonik)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        gray: "rgba(223, 239, 254, 0.14)",
        white: "#D9D9D9",
      },
      backgroundImage: {
        "divider-glow":
          "radial-gradient(50.00% 104.84% at 50.00% 0.00%, rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
        "gradient-text":
          "linear-gradient(100deg, #F4C587 0%, #D6D3E9 60.42%, #99D2EC 95.31%)",
        "gradient-text-144":
          "linear-gradient(144deg, #FDC066 0%, #D8D3E9 51.00%, #7BD1ED 100%)",
        pattern: "url('/bg-pattern.jpg')",
        footer: "url('/footer-bg.svg')",
        fader: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 50%);",
        "gradient-white":
          "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.50) 100%);",
      },
      border: {
        "nile-gradient":
          "linear-gradient(144deg, #FDC066 0%, #D8D3E9 51.00%, #7BD1ED 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
