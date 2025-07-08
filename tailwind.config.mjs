/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dragon-orange': '#FF8C00',
        'dragon-orange-light': '#FFB84D', // Better contrast for dark backgrounds
        'dragon-blue': '#1E3A8A',
        'dragon-gold': '#FFD700',
        'dragon-red': '#DC2626',
        'saiyan-yellow': '#FEF08A',
        'namek-green': '#16A34A',
        'namek-green-light': '#22C55E', // Better contrast for dark backgrounds
      },
      fontFamily: {
        dragon: ['Orbitron', 'monospace'],
        manga: ['Bangers', 'cursive'],
      },
      backgroundImage: {
        'dragon-gradient': 'linear-gradient(135deg, #FF8C00 0%, #FFD700 50%, #FF8C00 100%)',
        'saiyan-gradient': 'linear-gradient(135deg, #FEF08A 0%, #FFD700 50%, #F59E0B 100%)',
        'space-gradient': 'linear-gradient(135deg, #0F0F23 0%, #1E1B4B 50%, #312E81 100%)',
      },
      animation: {
        'energy-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px #FFD700' },
          to: { boxShadow: '0 0 30px #FF8C00' },
        },
      },
    },
  },
  plugins: [],
};
