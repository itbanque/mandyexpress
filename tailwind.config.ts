import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mandy: {
          navy: "#061b36",
          blue: "#00264c",
          orange: "#ff5a00",
          pale: "#f7f9fb"
        }
      },
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "\"Arial Narrow Bold\"", "sans-serif"],
        body: ["Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        header: "0 2px 12px rgba(6, 27, 54, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
