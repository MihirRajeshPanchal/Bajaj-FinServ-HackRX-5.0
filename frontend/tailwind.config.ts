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
			  'text': '#021050',
			  'background': '#f1f8fe',
			  'primary': '#0439b4',
			  'secondary': '#80b7fa',
			  'accent': '#1066f9',
		  }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
