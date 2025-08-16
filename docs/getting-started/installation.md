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

LorgaUI requires some theme variables to be set and you also need to include the components as source in your tailwind css config.
Do this by adding the following lines to your main css file:

``` css
@import 'lorga-ui/theme.css';
@import 'lorga-ui/style.css';
@source '../node_modules/lorga-ui/dist/es.js';  // ATTENTION: this needs to be relative to your css file and hit the correct file
```

With the 2 imports you should have correct spinner and select styles plus the required variables. With the source Tailwind CSS should not purge the classes used in the components.
