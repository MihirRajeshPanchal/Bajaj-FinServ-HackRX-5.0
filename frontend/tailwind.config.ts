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
			  'text': '#010a0d',
			  'background': '#f0fbfe',
			  'primary': '#11c6f3',
			  'secondary': '#937af8',
			  'accent': '#993ef5',
		  }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
