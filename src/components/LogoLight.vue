<template>
  <div class="flex space-x-3">
    <router-link :to="to" class="flex items-center space-x-2">
      <svg
        class="w-7 h-7"
        width="240.67"
        height="241"
        enable-background="new 0 0 256 256"
        version="1.1"
        viewBox="0 0 240.67 241"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(4,4)" fill="#FFFFFF">
          <path
            d="m44 189h104v44h-148v-117.27c0-29.44 11.764-56.277 29.834-76.727l30.083 31c-10.141 12.41-15.917 28.438-15.917 45.717z"
            style="fill: #003c4d; stroke-width: 8; stroke: #003c4d"
          />
          <path
            d="m116.67 7c29.116 0 56.395 11.055 76.981 31.644 20.587 20.587 32.019 48.243 32.019 77.356 0 24.463-7.286 47.124-22 66l-22-21c8.806-12.858 14-28.238 14-45 0-43.561-35.439-79-79-79-16.636 0-32.94 5.062-46 14l-21-22c19.225-14.91 42.573-22 67-22zm0-7c-26 0-52.314 9.087-72.095 24.777-1.73 1.359-3.256 2.732-4.905 4.223l30 31c12.46-10.329 29.56-16 47-16 39.76 0 72 32.24 72 72 0 17.439-5.67 33.539-16 46l31 30c18.25-20.48 29-46.4 29-76 0-64.061-53-116-116-116z"
            style="fill: #003c4d; stroke-width: 8; stroke: #003c4d"
          />
        </g>
      </svg>
      <h1 class="text-2xl font-bold text-blue-700">Lorga UI</h1>
    </router-link>
    <div class="w-px h-8 bg-blue-700"></div>
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
