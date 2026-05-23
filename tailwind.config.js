import type {
  Config,
} from "tailwindcss"

const config: Config = {

  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {

    extend: {

      fontFamily: {

        sans: [
          "var(--font-inter)",
        ],

      },

      borderRadius: {

        "4xl":
          "2rem",

      },

      boxShadow: {

        premium:
          "0 20px 60px rgba(15, 23, 42, 0.08)",

      },

      backgroundImage: {

        premium:
          "linear-gradient(to bottom right, #ffffff, #f8fafc)",

      },

    },

  },

  plugins: [],
}

export default config