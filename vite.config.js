import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (chunkInfo) => {
          const assetName = chunkInfo.names[0];
          const isAssetImage = /\.(png|jpe?g|gif|svg|webp)/i.test(assetName);

          if (isAssetImage) return "assets/images/[name]-[hash][extname]";

          return "assets/[ext]/[name]-[hash][extname]";
        }
      }
    }
  },
  plugins: [react(), tailwindcss()],
});