import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://marshall-wayans.github.io/My-Protfolio-React-/',
})
