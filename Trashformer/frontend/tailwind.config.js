/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trash: {
          dark: '#14532d',     // Xanh lá đậm chủ đạo
          primary: '#16a34a',  // Xanh lá tươi
          light: '#4ade80',    // Xanh lá nhạt phụ
          mint: '#dcfce7',     // Nền xanh pastel
          organic: '#16a34a',  // Nhóm A: Hữu cơ
          inorganic: '#2563eb',// Nhóm B: Vô cơ
          hazardous: '#ea580c' // Nhóm C: Thu gom riêng
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

