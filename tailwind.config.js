/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        elite: {
          dark: '#0a0f1a',
          'dark-2': '#1a2332',
          'dark-3': '#0a1223',
        },
        gold: {
          DEFAULT: '#fbbf24',
          secondary: '#f59e0b',
          premium: '#f5c77a',
        },
        accent: {
          blue: '#2563eb',
          cyan: '#06b6d4',
          neon: '#3bbcff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Feather Bold"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0f1a 0%, #1a2332 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15), transparent 60%)',
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(37, 99, 235, 0.3)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.4)',
        'glow-gold-strong': '0 15px 35px rgba(251, 191, 36, 0.4)',
        card: '0 10px 30px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'rotate-glow': 'rotateGlow 15s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },

        ping: {
            '75%, 100%': { transform: 'scale(2)', opacity: '0' },
          },
          rotateGlow: {
            from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
            to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
          },
      },
    },
  },
  plugins: [],
};