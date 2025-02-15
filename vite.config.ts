import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    proxy: {
      "/user": "http://localhost:8000",
      "/product": "http://localhost:8000",
      "/search-product": "http://localhost:8000",
      "/order-product": "http://localhost:8000",
      "/cart-product": "http://localhost:8000",
    },
  },
});
