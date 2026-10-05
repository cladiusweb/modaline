import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF9F6",
        bone: "#F4F1EA",
        taupe: "#8C827A",
        sand: "#E3DDD3",
        obsidian: "#121212",
      },
      fontFamily: {
        serif: ["Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["Space Mono", "Courier New", "monospace"],
      },
      letterSpacing: {
        widest: ".2em",
        editorial: ".3em",
      }
    },
  },
  plugins: [],
};
export default config;
