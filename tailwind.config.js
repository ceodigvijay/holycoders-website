const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: ["./pages/**/*.js", "./components/**/*.js"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef9f7",
          100: "#daf8ee",
          200: "#b0f3d6",
          300: "#73eab8",
          400: "#27d989",
          500: "#0cc45b",
          600: "#36a666",
          700: "#118b3b",
          800: "#146c36",
          900: "#135730",
        },
        secondary: "#474787",
        tertiary: "#738182",
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: "#e0e0e0",
            a: {
              color: "#3ad47c",
            },
            p: {
              color: colors.gray[300],
            },
            th: {
              color: colors.gray[300],
            },
            td: {
              color: colors.gray[300],
            },
            li: {
              color: colors.gray[300],
            },
            h1: {
              color: colors.gray[200],
            },
            h2: {
              color: colors.gray[200],
            },
            h3: {
              color: colors.gray[200],
            },
            h4: {
              color: colors.gray[200],
            },
            h5: {
              color: colors.gray[200],
            },
            h6: {
              color: colors.gray[200],
            },
            strong: {
              color: colors.gray[100],
            },
            code: {
              color: "#A9B1D6",
            },
            figcaption: {
              color: theme("colors.gray.500"),
            },

            "::selection": {
              backgroundColor: "#6f7bb635",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      display: ["group-hover", "focus", "dark"],
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
