/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#080b10',
          100: '#0d121a',
          200: '#111823',
          300: '#161f2c'
        },
        frost: {
          50: '#eaf7ff',
          100: '#cdeeff',
          200: '#a5e0fb',
          300: '#7dd3fc',
          400: '#4cc2f7',
          500: '#22a8e0'
        },
        glacier: '#a5f3fc',
        ember: '#fbbf24',
        deepteal: '#0b2b34'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      backgroundImage: {
        aurora:
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(125,211,252,0.18), transparent), radial-gradient(ellipse 60% 40% at 90% 10%, rgba(165,243,252,0.10), transparent)'
      },
      clipPath: {
        shard: 'polygon(0 8%, 15% 0, 100% 0, 100% 92%, 85% 100%, 0 100%)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(125,211,252,0.15)',
        card: '0 8px 32px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: []
};
