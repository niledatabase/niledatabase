/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "2.25rem",
        "2xl": "2.25rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-aeonik)"],
        medium: ["var(--font-aeonik-medium)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        gray: "rgba(255, 255, 255, 0.25)",
        lightGray: "rgba(255, 255, 255, 0.50)",
        darkGray: "#1C1C1C",
        orange: "#FFBA6A",
        brightOrange: "rgb(244,194,117)",
        blue: "#6FE2FF",
        purple: "#D8D3FF",
        dimmer: "#97a1aa",
        white: "#D9D9D9",
        black: "#0E0E0E",
        error: "#ea3a42",
        warning: "#fa9621",
        success: "#00B790",
        info: "#929292",
      },

      /*
      below this probably not used
      */

      backgroundImage: {
        gradient: "linear-gradient(90deg, rgb(14,14,14), rgb(20,20,20))",
        overlay:
          "linear-gradient(90deg, #F4C587 9.19%, #D6D3E9 51.63%, #99D2EC 94.07%)",
        icon: "linear-gradient(134deg, #FDC066 7.53%, #D8D3E9 51.23%, #7BD1ED 93.21%)",
        "divider-bold":
          "linear-gradient(90deg, #00000000, #FDC06780, #83D2ED80, #00000000)",
        border:
          "linear-gradient(180deg, rgba(223, 239, 254, 0.14) 90%,  rgba(0, 0, 0, 0.00) 100%)",
        divider:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.00) 0%, rgba(253, 192, 103, 0.50) 31.77%, rgba(131, 210, 237, 0.50) 71.35%, rgba(0, 0, 0, 0.00) 100%);",

        circular: "radial-gradient(closest-side, #d9d9d9, #00000000)",
        "circular-blur":
          "linear-gradient(144deg, #f4c5877a, #7CD1ED7a, rgba(0,0,0,0))",
        "footer-fade":
          "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);",
        fade: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #000 50%);",
        90: "linear-gradient(180deg, #f4c587, #d6d3e9, #99d2ec)",
        "fade-out":
          "radial-gradient(circle, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 1) 65%)",
        "fade-out-gray":
          "radial-gradient(circle, rgba(28, 28, 28, 0.00) 0%, #1C1C1C 1000%)",

        "horizontal-fade":
          "linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #000 100%);",

        "divider-glow":
          "radial-gradient(50.00% 104.84% at 50.00% 0.00%, rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
        "hero-glow":
          "radial-gradient(rgba(255, 255, 255, 0.10) 0%, rgba(0, 0, 0, 0.00) 80%)",

        "gradient-box":
          "linear-gradient(170deg, #F4C587 7.25%, #D6D3E9 50.26%, #99D2EC 93.27%)",

        "gradient-text":
          "linear-gradient(100deg, #F4C587 0%, #D6D3E9 60.42%, #99D2EC 95.31%)",
        "gradient-text-144":
          "linear-gradient(144deg, #FDC066 0%, #D8D3E9 51.00%, #7BD1ED 100%)",
        visualization: "url('/virtualization.svg')",
        footer: "url('/footer-bg.svg')",
        base: "url('/bg-pattern.webp')",
        community: "url('/hero-community.png')",
        docs: "url('/hero-docs.png')",
        templates: "url('/hero-templates.png')",
        "console-video": "url('/hero-bg-video.png')",
        "video-bg": "url('/video-bg.webp')",
        blueBlur: "url('/bg-blue.svg')",
        blueBlurText: "radial-gradient(#7CD1ED7a, rgba(0, 0, 0, 0.00) 80%)",
        orangeBlur: "url('/bg-orange.svg')",
        orangeBlurText: "radial-gradient(#f4c5877a, rgba(0, 0, 0, 0.00) 80%)",
        brown:
          "linear-gradient(162deg, #FF9F30 -0.84%, #B1AFE5 48.53%, #2295B7 100%)",
        // blue: "linear-gradient(162deg, #FF9F30 -0.84%, #B1AFE5 48.53%, #2295B7 100%);",
        fader: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 50%);",
        "gradient-white":
          "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.7) 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
