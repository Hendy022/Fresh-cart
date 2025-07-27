/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
      container:{
        center :true,
        padding: "1rem"
      }
    ,extend: {
      colors:{
        'main' : '#0aad0a',
        'light' : '#f0f3f2'
      }
    },
  },
  plugins: [],
}