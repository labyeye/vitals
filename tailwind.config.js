/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '100': '25rem',   // 400px
        '112': '28rem',   // 448px
        '120': '30rem',   // 480px
        '128': '32rem',   // 512px
        '140': '35rem',   // 560px
        '160': '40rem',   // 640px
        '180': '45rem',   // 720px
        '200': '50rem',   // 800px
      }
    },
  },
  plugins: [],
};