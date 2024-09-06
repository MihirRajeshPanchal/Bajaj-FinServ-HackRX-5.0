import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			poppins: ['Poppins', 'sans-serif']
  		},
  		colors: {
			text: '#0d121c',
			background: '#f5f7fa',
			primary: '#476db8',
			secondary: '#8ea7d7',
			accent: '#7192d1',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
