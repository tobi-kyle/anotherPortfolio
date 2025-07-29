// tailwind.config.js - tailwind CSS configuration file
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        floatUp: {
          '0%': {
            transform: 'translateY(40px)',
            opacity: '0',
          },
          '50%': {
            transform: 'translateY(-10px)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateY(-60px)',
            opacity: '0',
          },
        },
      },
      animation: {
        floatUp: 'floatUp 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
