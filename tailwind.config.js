/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
        'bg-primary': '#FFBB00',
        'bg-secondary': '#FFD154',

        'text-primary':'#261F43',
        'text-secondary':'#552951'

        
      },
    },
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
