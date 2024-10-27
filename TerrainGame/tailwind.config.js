
const Colors = {
  dark: {
    foreground: '#ecf4fe',
    background: '#1c1a1b',
    primary: '#73ff83',
    darkForeground: '#0e2f1a'
  },
  light: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#FFA500',
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: Colors.dark.background, // Full black background
        foreground: Colors.dark.foreground, // White text
        darkForeground: Colors.dark.darkForeground, // Black text
        button: {
          DEFAULT: 'rgba(255, 255, 255, 0.8)', // White with transparency
          hover: 'rgba(255, 255, 255, 0.6)', // Transparent hover effect
        },
        primary: Colors.dark.primary, // Orange primary color
        highlight: '#32CD32', // Green highlight color for active tabs
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        start: '#32CD32', // Starting color of the gradient
        end: '#FFA500',  // Ending color of the gradient
      }),
    },
  },
  plugins: [],
}