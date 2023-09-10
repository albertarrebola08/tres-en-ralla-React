import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Excluye el módulo "constants" de la externalización.
    exclude: ['constants'],
  },
})
