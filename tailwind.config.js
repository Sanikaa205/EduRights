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
        'primary': 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        'primary-depth': 'hsl(var(--primary-depth))',
        'secondary': 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        'secondary-depth': 'hsl(var(--secondary-depth))',
        'accent': 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'accent-depth': 'hsl(var(--accent-depth))',
        'success': 'hsl(var(--success))',
        'success-foreground': 'hsl(var(--success-foreground))',
        'success-depth': 'hsl(var(--success-depth))',
        'navbar': '#87CEEB',
        'footer': '#FFFACD',
        'card': 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'muted': 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        'destructive': 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'border-main': '#D1D5DB',
        'border': 'hsl(var(--border))',
        'pink': 'hsl(var(--pink))',
        'pink-foreground': 'hsl(var(--pink-foreground))',
        'pink-depth': 'hsl(var(--pink-depth))',
        'mint': 'hsl(var(--mint))',
        'mint-foreground': 'hsl(var(--mint-foreground))',
        'mint-depth': 'hsl(var(--mint-depth))',
        'orange': 'hsl(var(--orange))',
        'orange-foreground': 'hsl(var(--orange-foreground))',
        'orange-depth': 'hsl(var(--orange-depth))',
        'lime': 'hsl(var(--lime))',
        'lime-foreground': 'hsl(var(--lime-foreground))',
        'lime-depth': 'hsl(var(--lime-depth))',
        'text-main': '#333333',
        'text-light': '#FFFFFF',
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'Comic Sans', 'cursive', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
        'display': ['Fredoka', 'sans-serif'],
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
  plugins: [
    function ({ addUtilities, theme }) {
      const getFont = (key) => {
        const val = theme(`fontFamily.${key}`);
        return Array.isArray(val) ? val.join(', ') : val;
      };
      addUtilities({
        '.font-body': {
          'font-family': getFont('body'),
        },
        '.font-display': {
          'font-family': getFont('display'),
        },
      });
    },
  ],
};
