/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: "rgba(255, 255, 255, 1)",
        primaryColor: "rgba(30, 30, 30, 1)",  // Converted #1e1e1e
        blackColor: "rgba(30, 30, 30, 1)",    // Converted #1e1e1e
        secondaryBg: "rgba(149, 149, 149, 1)", // Converted #959595
        themeColor: "rgba(78, 42, 232, 1)",    // Converted #3700b3
        neutralColor: "rgba(72, 72, 77, 1)",  // Converted rgb(72, 72, 77)
        bodyText: "rgba(69, 69, 103, 1)",     // Converted #454567
        borderColor: "rgba(195, 195, 206, 1)", // Converted #c3c3ce
         // ✅ Added requested colors
         textBackground: "rgba(240, 240, 240, 1)", // Light gray for backgrounds (#F0F0F0)
         defaultColor: "rgb(78 42 232,1)",    // Facebook blue (#1877F2)
         textBody: "rgba(50, 50, 50, 1)",          // Black-gray for body text (#323232)
         textGray: "rgba(128, 128, 128, 1)",       // Gray for text (#808080)
      },
    },
  },
  plugins: [require("tailwindcss-rtl")], // ✅ Enable RTL support
};
