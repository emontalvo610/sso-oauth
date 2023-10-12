const tailwindBaseConfig = require('@pickleballinc/configs');

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [tailwindBaseConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
      },
      fontSize: {
        sm: '14px',
        md: '16px',
      }
    },
    screens: {
      sm: { max: "639px" }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
export default config