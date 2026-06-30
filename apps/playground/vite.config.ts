import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dns from "dns";
import { resolve } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// sets localhost as default instead of 127.0.0.1
dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  server: {
    port: 4500,
    host: "localhost",
  },
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(rootDir, "../../packages/ui/src"),
    },
  },
});
