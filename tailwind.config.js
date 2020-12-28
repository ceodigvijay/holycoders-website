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
        primary: colors.blue,
        secondary: "#ecc94b",
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
      display: ["group-hover", "focus"],
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
