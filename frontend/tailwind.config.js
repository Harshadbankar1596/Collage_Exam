/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        // custom spin speeds
        'spin-slow': 'spin 1s linear infinite',
        'spin-fast': 'spin 0.1s linear infinite',
        // reverse spin
        'spin-reverse': 'spin-reverse 1s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          to: { transform: 'rotate(-360deg)' }, 
        },
      },
    },
  },
  plugins: [],
}
