<template>
  <div class="flex space-x-3">
    <router-link :to="{ name: 'index' }" class="flex items-center space-x-2">
      <svg
        class="w-8 h-8"
        width="256px"
        height="256px"
        enable-background="new 0 0 256 256"
        version="1.1"
        viewBox="0 0 256 256"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Hintergrund">
          <rect width="256" height="256" fill="#003C4D" />
        </g>

        <g fill="#fff">
          <path
            d="M55,201h104v44H11V127.727C11,98.287,22.764,71.45,40.834,51l30.083,31    C60.776,94.41,55,110.438,55,127.717V201z"
          />
          <path
            d="m127.67 19c29.116 0 56.395 11.055 76.981 31.644 20.587 20.587 32.019 48.243 32.019 77.356 0 24.463-7.286 47.124-22 66l-22-21c8.806-12.858 14-28.238 14-45 0-43.561-35.439-79-79-79-16.636 0-32.94 5.062-46 14l-21-22c19.225-14.91 42.573-22 67-22zm0-7c-26 0-52.314 9.087-72.095 24.777-1.73 1.359-3.256 2.732-4.905 4.223l30 31c12.46-10.329 29.56-16 47-16 39.76 0 72 32.24 72 72 0 17.439-5.67 33.539-16 46l31 30c18.25-20.48 29-46.4 29-76 0-64.061-53-116-116-116z"
          />
        </g>
      </svg>
      <h1 class="text-2xl font-bold text-white">Lorga UI</h1>
    </router-link>
    <div class="w-px h-8 bg-white"></div>
    <img
      src="../images/sponsor-cms.opt.jpeg"
      alt="CMS Stiftung"
      class="w-auto h-8 overflow-hidden rounded"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteLocationRaw } from "vue-router";

export default defineComponent({
  props: {
    to: {
      required: true,
      type: Object as PropType<RouteLocationRaw>,
    },
  },
});
</script>
