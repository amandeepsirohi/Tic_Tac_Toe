module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        grow: {
          "0%": { transform: "scale(0) rotate(-150deg)", opacity: 0 },
          "100%": { transform: "scale(1) rotate(0)", opacity: 1 },
        },
      },
      animation: {
        grow: "grow 400ms ease-in-out",
      },
    },
  },
  variants: {},
  plugins: [],
};
