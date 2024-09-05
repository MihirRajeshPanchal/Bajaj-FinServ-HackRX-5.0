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
        'text': 'hsl(260,43%,96%)',
        'background': 'hsl(260,60%,2%)',
        'primary': 'hsl(260,69%,47%)',
        'secondary': 'hsl(260,84%,30%)',
        'accent': 'hsl(260,99%,39%)',
      },
    },
  },
  plugins: [],
};
export default config;
