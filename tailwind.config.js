/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary: "#020617", 
      secondary: "#dc2626",
      neutral: "#f5f5f5",
      white: "#ffffff",
      black: "#000000",
      gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        500: "#6b7280",
        700: "#374151",
        900: "#111827",
      },
      red: {
        500: "#ef4444",
        600: "#dc2626",
      },
      green: {
        500: "#10b981",
      },
      yellow: {
        300: "#fcd34d",
        500: "#f59e0b",
      },
      orange: {
        500: "#f97316",
      },
      slate: {
        900: "#1e293b",
      },
    },
    extend: {},
  },
  plugins: [],
}