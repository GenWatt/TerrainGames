
const Colors = {
  dark: {
    foreground: '#ecf4fe',
    foreground2: '#d7e7f7',
    background: '#1c1a1b',
    primary: '#73ff83',
    darkForeground: '#0e2f1a',
    dim: '#364239C1',
    danger: '#ff0000',
  },
  light: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#FFA500',
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./features/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: Colors.dark.background, // Full black background
        foreground: Colors.dark.foreground, // White text
        foreground2: Colors.dark.foreground2, // Lighter white text
        darkForeground: Colors.dark.darkForeground, // Black text
        dim: Colors.dark.dim, // Dimmed text
        danger: Colors.dark.danger, // Red danger color
        button: {
          DEFAULT: 'rgba(255, 255, 255, 0.8)', // White with transparency
          hover: 'rgba(255, 255, 255, 0.6)', // Transparent hover effect
        },
        primary: Colors.dark.primary, // Orange primary color
        highlight: '#32CD32', // Green highlight color for active tabs
      },
      fontSize: {
        '2xs': '.5rem',
        '3xs': '.4rem',
        '1xs': '.75rem',
        'md': '1.125rem',
        'lg': '1.25rem',
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