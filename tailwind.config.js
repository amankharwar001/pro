/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',    // Default padding for all screens
        sm: '1.5rem',       // Small screens
        md: '2rem',         // Medium screens
        lg: '3rem',         // Large screens
        xl: '4rem',         // Extra-large screens
        '2xl': '6rem',      // 2XL screens
      },
      screens: {
        sm: '100%',         // Full width on small screens
        md: '850px',        // Medium screens
        lg: '1024px',       // Large screens
        xl: '1280px',       // Extra-large screens
        '2xl': '1440px',    // 2XL screens
      },
    },
    
    
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        adminbtn:"#151D2C"
      },
      // animation
      animation: {
        'left-right': 'leftRight 6s ease-in-out infinite',
        'right-left': 'rightLeft 6s ease-in-out infinite',
        'zoom-in-out': 'zoomInOut 2.5s ease-in-out infinite', 
        'up-down': 'upDown 3s ease-in-out infinite'
      },
      keyframes: {
        leftRight: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(60px)' },
          '100%': { transform: 'translateX(0)' },
        },
        rightLeft: {
          '0%': { transform: 'translateX(10)' },
          '50%': { transform: 'translateX(-60px)' },
          '100%': { transform: 'translateX(0)' },
        },
        zoomInOut: { // New keyframes for zoom in and out
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        upDown: { // New keyframes for up-down motion
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
