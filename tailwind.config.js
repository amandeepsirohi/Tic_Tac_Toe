module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        grow: {
          "0%": { transform: "scale(0.1)", opacity: 0 },
          "80%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        grow: "grow 300ms ease-out",
      },
    },
  },
  variants: {},
  plugins: [],
};
