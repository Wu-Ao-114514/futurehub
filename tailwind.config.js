/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': '#FAFAFA',
        'text-primary': '#374151',
        'text-heading': '#111827',
        'brand-blue': '#3B82F6',
        'brand-dark-blue': '#1E3A8A',
        'bg-bubble': '#F3F4F6',
        'bg-note': '#EFF6FF',
        'tag-yellow': '#FEF08A',
      },
      fontFamily: {
        serif: ['Merriweather', 'Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        relaxed: 1.75,
      },
      maxWidth: {
        'content': '720px',
      },
    },
  },
  plugins: [],
}
