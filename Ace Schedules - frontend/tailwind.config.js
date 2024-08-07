/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xsm': '0px',
      
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      keyframes: {
        showUp: {
          '0%': {
            opacity: 0
            
          },
          '20%': {
            opacity: 0
          },
          '50%': {
            opacity: 1
            
          },
          '100%': {
            opacity: 1
            
          }
        }
      }
    },
  },
  plugins: [],
}

