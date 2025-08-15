# Installation

```sh
npm install lorga-ui
```

You also need to install the peer dependencies:
```sh
npm install @headlessui/vue @heroicons/vue vue
```

You also need the additional Tailwind CSS Typography package:
```sh
npm install @tailwindcss/typography
```


## Setup

Setup Tailwind CSS according to their [docs](https://tailwindcss.com/docs/installation). 

LorgaUI requires some theme variables to be set and you also need to include the compents as source in your tailwind css config.
Do this by adding the following lines to your main css file:

``` css
@import 'node_modules/lorga-ui/dist/theme.css';
@source 'node_modules/lorga-ui/dist/es.js';
```

With those 2 files you should have the required variables being set by Tailwind CSS and the classes used by the LorgaUI components will not get purged.
