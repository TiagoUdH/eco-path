/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: "#0020C7"
      },
      fontFamily: {
        heading: "Roboto_700Bold",
        body: "Roboto_400Regular",
      },
    },
  },
  plugins: [],
}