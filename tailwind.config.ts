import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem'
      }
    },
    extend: {

      backgroundImage: {
        'home1' : "url('/home-1.jpg')",
        'home2' : "url('/home-2.png')",
        'home3' : "url('/home-3.png')",
      },

      colors: {
        primaryBlue: '#43568C', 
        deepBlue: '#032998',                
        brightYellow: '#FDDF39',             
        softYellow:"#FFEC9F" ,
        skyBlue: "#6AC4E0"
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        greatvibes: ['var(--font-greatvibes)', 'serif'],
        cormorant: ['var(--font-cormorant-garamond)', 'serif'],
      },
    }
  },
  plugins: []
};

export default config;
