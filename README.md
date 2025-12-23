# 1. Initialize npm (if not already done)
npm init -y

# 2. Install React, React DOM, and React Router
npm install react react-dom react-router-dom

# 3. Install Vite (as a dev dependency)
npm install --save-dev vite @vitejs/plugin-react

# 4. Install Tailwind CSS and its build tools
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Install UI and utility libraries
npm install lucide-react @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-toast @radix-ui/react-tooltip class-variance-authority clsx tailwind-merge sonner next-themes prop-types

# 6. Install font packages
npm install @fontsource/fredoka @fontsource/nunito

# 7. (Optional, but used in your project) Install chart and query libraries
npm install recharts @tanstack/react-query