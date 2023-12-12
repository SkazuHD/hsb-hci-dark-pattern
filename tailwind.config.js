/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        custom_gunmetal: "#083344",
        custom_claret: "#8B1E3F",
        custom_lavender: {
          100: "#F0F2FA",
          200: "#DAE0F2"
        },
        custom_darkcyan: "#379392",
        custom_scarlet: "#FF220C",
      },
    },
  },
  plugins: [],
}

