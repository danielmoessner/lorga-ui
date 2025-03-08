<template>
  <TableTable>
    <TableHead>
      <TableRow class="divide-x divide-gray-200">
        <template v-for="item in computedHead" :key="item.name">
          <TableHeader
            :class="{
              'text-right md:sticky right-0 space-x-3 md:!border-l-0':
                item.key === 'action',
            }"
          >
            <slot :name="`head-${item.key}`">
              {{ item.name }}
            </slot>
            <div
              v-if="item.key === 'action'"
              class="hidden md:block absolute top-0 bottom-0 left-0 w-px h-full bg-gray-200 !m-0"
            ></div>
          </TableHeader>
        </template>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow
        v-for="(dataItem, index) in data"
        :key="index"
        class="divide-x divide-gray-100"
      >
        <template v-for="headItem in computedHead" :key="headItem.name">
          <TableData
            :class="{
              [config.table.tdAction]: headItem.key === 'action',
            }"
          >
            <slot
              v-bind="dataItem"
              :name="headItem.key"
              :i="dataItem"
              :fn="headItem.fn"
              :v="headItem.fn(dataItem)"
            >
              {{ headItem.fn(dataItem) }}
            </slot>
            <div
              v-if="headItem.key === 'action'"
              class="hidden md:block absolute top-0 bottom-0 left-0 w-px h-full bg-gray-100 !m-0"
            ></div>
          </TableData>
        </template>
      </TableRow>
      <TableRow v-show="innerLoading">
        <TableData :colspan="head.length">
          <CircleLoader />
        </TableData>
      </TableRow>
      <TableRow v-if="showTotal">
        <TableData :colspan="head.length - 1" />
        <TableData class="text-right !py-2.5 md:sticky right-0">
          <span v-if="!innerLoading && data">{{ data.length }} Total</span>
          <span v-else>Loading...</span>
        </TableData>
      </TableRow>
    </TableBody>
  </TableTable>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
type KeyFunction = (_: any) => string | number | boolean | null | undefined;

export type IHead = {
  key?: KeyFunction | string;
  name: string;
  fn?: KeyFunction;
}[];
</script>

<script lang="ts" setup generic="T">
import TableTable from "./TableTable.vue";
import TableData from "./TableData.vue";
import TableBody from "./TableBody.vue";
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import TableHeader from "./TableHeader.vue";
import { computed, toRefs } from "vue";
import CircleLoader from "./CircleLoader.vue";
import { useConfig } from "@/config";

const { config } = useConfig();

interface ComputedHead {
  key?: string;
  name: string;
  fn: KeyFunction;
}

const props = defineProps<{
  head: IHead;
  data?: T[] | undefined | null;
  loading?: boolean;
  showTotal?: boolean;
}>();

const { data, loading, head } = toRefs(props);

const computedHead = computed(() => {
  const ch: ComputedHead[] = [];
  head.value.forEach((item) => {
    let key: string | undefined = undefined;
    let fn: KeyFunction;
    if (typeof item.key === "string") key = item.key;
    if (item.fn) {
      fn = item.fn;
      if (typeof item.key === "function")
        throw new Error("key of :head prop needs to be a string if fn is set");
    } else if (item.key && typeof item.key === "function") {
      fn = item.key;
    } else if (item.key && typeof item.key === "string") {
      fn = (o) => o[item.key as string] || "";
    } else {
      throw new Error(":head prop needs to set key or fn");
    }
    ch.push({
      key: key,
      name: item.name,
      fn: fn,
    });
  });
  return ch;
});

const innerLoading = computed(() => {
  return loading?.value || !data?.value;
});
</script>
