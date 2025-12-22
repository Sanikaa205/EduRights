/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#87CEEB',
        'soft-yellow': '#FFFACD',
        'light-purple': '#DDA0DD',
        'mint-green': '#98FB98',
        'primary': '#87CEEB',
        'secondary': '#FFFACD',
        'accent': '#DDA0DD',
        'success': '#98FB98',
        'navbar': '#87CEEB',
        'footer': '#FFFACD',
        'card': '#FFFFFF',
        'text-main': '#333333',
        'text-light': '#FFFFFF',
        'border-main': '#D1D5DB',
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'Comic Sans', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1.25rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
