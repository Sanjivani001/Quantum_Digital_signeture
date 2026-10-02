export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#08131f',
        panel: '#101c2d',
        panelAlt: '#13283d',
        accent: '#7dd3fc',
        cyan: '#67e8f9',
        violet: '#a78bfa',
        emerald: '#34d399',
        amber: '#fbbf24',
        rose: '#f87171'
      },
      boxShadow: {
        panel: '0 16px 40px rgba(10, 20, 32, 0.45)',
        glow: '0 0 0 1px rgba(125, 211, 252, 0.22), 0 18px 36px rgba(34, 211, 238, 0.15)'
      }
    }
  },
  plugins: []
}

