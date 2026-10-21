import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { PRODUCT_NAME, PRODUCT_TAGLINE, STORAGE_PREFIX } from './src/config/product.ts'

// Fills %PRODUCT_NAME% etc. in index.html from the single product constant.
function productHtml(): Plugin {
  const values: Record<string, string> = { PRODUCT_NAME, PRODUCT_TAGLINE, STORAGE_PREFIX }
  return {
    name: 'product-html',
    transformIndexHtml: (html) => html.replace(/%(PRODUCT_NAME|PRODUCT_TAGLINE|STORAGE_PREFIX)%/g, (_, key: string) => values[key]),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), productHtml()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: 5173, strictPort: true },
})
