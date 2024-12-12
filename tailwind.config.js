/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      width: "90%",
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        sm: "0.5rem",
        lg: "1rem",
        xl: "2rem",
        "2xl": "4rem",
      },
    },
    extend: {
      colors: {
        accent: "#a364ff",
        primary: "#6c35de",
        secondary: "#C3F9EB",
      },
    },
  },
  plugins: [],
};
