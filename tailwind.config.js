/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     primary: {
    //       DEFAULT: '#3B82F6',
    //       dark: '#2563EB',
    //     },
    //     neutral: {
    //       dark: '#1F2937',
    //       lightest: '#F9FAFB',
    //     },
    //   },
    //   animation: {
    //     'slide-down': 'slideDown 0.3s ease-out',
    //   },
    //   keyframes: {
    //     slideDown: {
    //       '0%': { transform: 'translateY(-100%)' },
    //       '100%': { transform: 'translateY(0)' },
    //     },
    //   },
    // },

    extend: {
      colors: {
          primary: '#2B6EB9', 
          primaryHover:'#255ea3'

      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lato: ['"Lato"', 'sans-serif'],
      },
      boxShadow: {
        card: "0 3px 10px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 8px 20px rgba(0, 0, 0, 0.1)",
        button: "0 5px 10px rgba(93, 59, 140, 0.3)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-in-out",
        "slide-down": "slideDown 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
