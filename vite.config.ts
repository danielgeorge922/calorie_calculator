import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/FINAL_CALORIE_CALC/",
  plugins: [react()],
})
