import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

 
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': 'mella.dirtechsolution.com',  
    }
  },
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.d.ts'], // Ensure `.d.ts` is included

    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})
