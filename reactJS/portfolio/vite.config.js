import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';



// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'sockjs-client': path.resolve(__dirname, 'node_modules/sockjs-client/dist/sockjs.js')
    }
  },
  server: {
    port: 5173, // Change si nécessaire
    watch: {
      usePolling: true
    }
  }
})
