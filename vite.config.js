import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/pizzeria-mamma-mia-react/'   // 👈 nombre exacto del repo
})