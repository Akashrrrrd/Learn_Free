import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/learn-free": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
