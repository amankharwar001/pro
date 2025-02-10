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
    },
    fontSize: {
      h1: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.2", fontWeight: "700" }],
      h1_small: ["clamp(2.1rem, 4.8vw, 3.6rem)", { lineHeight: "1.2", fontWeight: "700" }],
      h2_small:  ["clamp(1.4rem, 3.4vw, 1.75rem)", { lineHeight: "2.275rem", fontWeight: "600" }],
      h2:  ["clamp(1.5rem, 3.5vw, 1.875rem)", { lineHeight: "1.4", fontWeight: "600" }],
      h2_medium: ["clamp(1.6rem, 3.8vw, 2.25rem)", { lineHeight: "2.875rem", fontWeight: "700" }],
      h2_big: ["clamp(1.75rem, 4vw, 2.813rem)", { lineHeight: "clamp(2.25rem, 4.5vw, 3.438rem)", fontWeight: "600" }],
      h2_large: ["clamp(1.95rem, 4.3vw, 3.125rem)", { lineHeight: "clamp(2.5rem, 5vw, 3.75rem)", fontWeight: "700" }],
      // h3: ["1.875rem", { lineHeight: "1.4", fontWeight: "600" }], 
      h3: ['clamp(1.5rem, 4vw, 1.875rem)', { lineHeight: '1.4', fontWeight: '600' }],

      h3_medium: ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: "700" }],
      // h4: ["1.5rem", { lineHeight: "1.5", fontWeight: "500" }],
      h4: ['clamp(1.25rem, 3vw, 1.5rem)', { lineHeight: '1.5', fontWeight: '500' }] ,
      h5: [
        "clamp(1.25rem, 4vw, 1.125rem)", 
        { lineHeight: "clamp(1.75rem, 4vw, 2rem)", fontWeight: "700" }
      ],
      h6: [
        "clamp(1rem, 2.5vw, 1.25rem)", 
        { lineHeight: "clamp(1.5rem, 3vw, 1.813rem)", fontWeight: "500" }
      ],
      p:[ "1rem", { lineHeight: "1.5", fontWeight: "400" }], 
      button: ["1.063rem", { lineHeight: "1.7", fontWeight: "500" }], 
    },
    
    
    extend: {
      boxShadow: {
        'custom': '0px 5px 10px rgba(0, 0, 0, 0.1), 0px -6px 20px rgba(0, 0, 0, 0.1), 4px 0px 10px rgba(0, 0, 0, 0.1), -4px 0px 10px rgba(0, 0, 0, 0.1)',
      },
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
