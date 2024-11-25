/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#FBEFE3',
      },
    },
    screens: {
      'mobile': {'max': '360px'},
      // 다른 브레이크포인트...
    }
  },
  plugins: [],
}

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }