import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import {defineConfig} from 'vitepress';

export default defineConfig({
  lang: "en-US",
  title: "Lorga UI",
  description: "Reusable components for your Vue3 frontend.",
  themeConfig: {
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Use", link: "/getting-started/use" },
          { text: "Additional Setup", link: "/getting-started/setup" },
        ],
      },
      {
        text: "Components",
        items: [
          { text: "Buttons", link: "/components/buttons" },
          { text: "Other", link: "/components/other" },
          { text: "Table", link: "/components/table" },
        ],
      },
    ],
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src')
      }
    },
    plugins: [
      tailwindcss()
    ]
  }
});
