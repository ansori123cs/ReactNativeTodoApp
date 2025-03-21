/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#8F87F1',
        accent: '#C68EFD',
        danger: '#E9A5F1',
        warning: '#FED2E2',
      },
    },
  },
  plugins: [],
};
