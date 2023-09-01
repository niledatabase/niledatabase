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
        black: "#0E0E0E",
      },
      backgroundImage: {
        border:
          "linear-gradient(180deg, rgba(223, 239, 254, 0.14) 90%,  rgba(0, 0, 0, 0.00) 100%)",
        divider:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.00) 0%, rgba(253, 192, 103, 0.50) 31.77%, rgba(131, 210, 237, 0.50) 71.35%, rgba(0, 0, 0, 0.00) 100%);",
        "footer-fade":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);",
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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
