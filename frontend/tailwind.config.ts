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
        'text': 'hsl(216, 16%, 94%)',
        'background': 'hsl(210, 30%, 4%)',
        'primary': 'hsl(209, 41%, 75%)',
        'secondary': 'hsl(210, 55%, 31%)',
        'accent': 'hsl(210, 70%, 52%)',
      },
    },
  },
  plugins: [],
};
export default config;
