    // tailwind.config.js
    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan your React components
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'], // Ensuring Inter font is used
          },
        },
      },
      plugins: [],
    }
