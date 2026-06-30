// import themeDefault from "vitepress/theme";

// export default themeDefault;

import "./styles/index.css";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import NotFound from "./layouts/NotFound.vue";
import { inBrowser } from "vitepress";
import nprogress from "nprogress";

export default {
  // root component to wrap each page
  Layout: DefaultLayout,

  // this is a Vue 3 functional component
  NotFound: NotFound,

  enhanceApp(/*{ app, router, siteData }*/ { router }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
    if (inBrowser) {
      router.onBeforeRouteChange = () => {
        nprogress.start();
      };
      router.onAfterRouteChanged = () => {
        nprogress.done(true);
      };
    }
  },

  setup() {
    // this function will be executed inside VitePressApp's
    // setup hook. all composition APIs are available here.
  },
};
