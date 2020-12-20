module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          50: "#f5fbf7",
          100: "#ebf6f0",
          200: "#cde9d9",
          300: "#afdbc2",
          400: "#72c194",
          500: "#36a666",
          600: "#31955c",
          700: "#297d4d",
          800: "#20643d",
          900: "#1a5132",
        },
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
