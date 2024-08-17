/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fffcfc", // Custom color named 'primary'
        secondary: "#6941c6",
        border: "#e3e9f0",
        customgray: "#475467",
        team1: "#A38ADC",
        team1bg: "#F8F4FF",
        team2bg: "#EFF8FF",
        team3bg: "#EEF4FF",
        team2: "#5084DF",
        team3: "#6266D9",
        lightblue: "#EEF4FA",
        darkblue: "#2A5B7E",
        btn1: "#F8FBFD",
        // Add more custom colors here
      },
    },
  },
  plugins: [],
};
