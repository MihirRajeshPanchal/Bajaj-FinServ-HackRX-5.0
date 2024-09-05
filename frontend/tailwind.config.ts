import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'text': 'hsl(264,50%,4%)',
        'background': 'hsl(260,60%,97%)',
        'primary': 'hsl(260,69%,53%)',
        'secondary': 'hsl(260,84%,70%)',
        'accent': 'hsl(260,99%,61%)',
      },
    },
  },
  plugins: [],
};
export default config;
