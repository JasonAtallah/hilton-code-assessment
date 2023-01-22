module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // adding custom colors here to match the design.png more accurately
      colors: {
        blue: {
          450: "#4683C8",
        },
        gray: {
          650: "#4C5566",
        },
        neutral: {
          450: "#A3AEBE",
        },
        slate: {
          150: "#E3E8EF",
        },
      },
    },
  },
  plugins: [],
};
