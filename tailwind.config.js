/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a'
      },
      boxShadow: {
        soft: '0 18px 40px rgba(15, 23, 42, 0.12)',
        glow: '0 30px 70px rgba(37, 99, 235, 0.18)'
      }
    }
  },
  plugins: []
};
