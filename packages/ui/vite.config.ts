import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dns from "dns";
import { resolve } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// sets localhost as default instead of 127.0.0.1
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4500,
    host: "localhost",
  },
  build: {
    lib: {
      entry: resolve(rootDir, "src/index.ts"),
      name: "lorga-ui",
      fileName: (format) => `${format}.js`,
      cssFileName: "style",
    },
    rollupOptions: {
      external: [
        "vue",
        "@heroicons/vue/20/solid",
        "@heroicons/vue/24/outline",
        "@headlessui/vue",
      ],
      output: {
        globals: {
          vue: "vue",
          "@heroicons/vue/24/outline": "@heroicons/vue/24/outline",
          "@heroicons/vue/20/solid": "@heroicons/vue/20/solid",
          "@headlessui/vue": "@headlessui/vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    // visualizer({template: 'sunburst'}),
  ],
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
    },
  },
});
