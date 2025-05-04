import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        neu: "3px 3px 5px #d1d9e6, -3px -3px 5px #ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
