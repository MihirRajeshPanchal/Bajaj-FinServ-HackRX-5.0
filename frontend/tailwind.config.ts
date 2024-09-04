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
      // colors: {
      //   pastelBlue: '#AECBFA',
      //   pastelGreen: '#C6F6D5',
      //   pastelYellow: '#FEF3C7',
      //   pastelPink: '#FBCFE8',
      //   pastelPurple: '#E9D8FD',
      //   pastelRed: '#FED7D7',
      // },
    },
  },
  plugins: [],
};
export default config;
