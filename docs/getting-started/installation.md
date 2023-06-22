# Installation

```sh
npm install lorga-ui
```

You also need to install the peer dependencies:
```sh
npm install @headlessui/vue @heroicons/vue vue
```

You also need the additional Tailwind CSS packages:
```sh
npm install @tailwindcss/typography
```


## Setup

Setup Tailwind CSS according to their [docs](https://tailwindcss.com/docs/installation) and use the following config. You need to change the content settings according to your project. But leave `node_modules/lorga-ui/dist/index.mjs` there, because Tailwind CSS should not purge the css classes of the components library.

``` js
module.exports = {
  content: [
    "...",
    "node_modules/lorga-ui/dist/es.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        formcolor: "#003c4d",
        blue: {
          50: "#eff9fb",
          100: "#d0e7ed",
          200: "#aad0db",
          300: "#8abbc9",
          400: "#6ca7b7",
          500: "#428193",
          600: "#275f6f",
          700: "#153f4b",
          800: "#0a2027",
          900: "#010203",
        },
      },
      typography: (theme: any) => ({  // eslint-disable-line
        DEFAULT: {
          css: {
            table: {},
            thead: {
              border: "none",
            },
            tr: {
              border: "none",
            },
            "tr:last-child": {
              borderBottomWidth: "0",
            },
            th: {
              verticalAlign: "bottom",
              borderWidth: "2px",
              borderColor: theme("colors.gray[400]"),
              backgroundColor: theme("colors.gray[200]"),
              padding: "4px 8px",
            },
            "th > p, td > p": {
              margin: 0,
            },
            td: {
              verticalAlign: "top",
              borderWidth: "2px",
              borderColor: theme("colors.gray[300]"),
              backgroundColor: theme("colors.gray[100]"),
            },
            "tbody td:first-child": {
              paddingLeft: "auto",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
```

## Shortcut

You can also use `getTailwindConfig` and do the following in your `tailwind.config.js`:

```js
const ui = require("lorga-ui");

const content = [
  "./src/**/*.{vue,js,ts,jsx,tsx}",
]

module.exports = ui.utils.getTailwindConfig(content);
```

## Styles

In your main css file you should import the `style.css` file from `lorga-ui` for example like this in `main.css`:

```css
@import "lorga-ui/style.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```
