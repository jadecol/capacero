/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#07070A", void2: "#0D0D11", void3: "#131318",
        bone: "#F4F1EB", "bone-dim": "rgba(244,241,235,0.55)",
        amber: "#C8A45A", "amber-dim": "rgba(200,164,90,0.12)", "amber-ink": "#7A5C14",
        rule: "rgba(244,241,235,0.08)"
      },
      fontFamily: {
        serif: ["Cormorant Garamond","serif"],
        sans: ["Space Grotesk","sans-serif"]
      }
    }
  },
  plugins: []
}
