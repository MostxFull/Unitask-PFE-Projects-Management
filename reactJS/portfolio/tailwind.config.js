/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        sans: ["Atkinson Hyperlegible Mono", "serif"],  // Définit la police par défaut pour tout texte
      },
      colors:{
        primary: "#F66435",
        secondary: "#F4EFCA",
        accent: "#CBE957",
      }
    },
  },
  plugins: [],
}

