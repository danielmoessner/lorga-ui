<template>
  <TableTable>
    <TableHead>
      <TableRow class="divide-x divide-gray-200">
        <template v-for="item in head" :key="item.name">
          <TableHeader
            :class="{
              'text-right md:sticky right-0 space-x-3 md:!border-l-0':
                item.key === 'action',
            }"
          >
            <button
              v-if="item.sortable"
              type="button"
              class="relative flex-grow w-full h-5 min-w-5"
              @click="changeSort(item.key)"
            >
              <div
                class="pr-8 text-xs font-medium tracking-wider text-left text-gray-500 uppercase whitespace-nowrap"
              >
                {{ item.name }}
              </div>
              <ChevronUpIcon
                :class="[
                  sortOrder === 'ASC' && sortKey === item.key
                    ? 'text-gray-500'
                    : 'text-gray-300',
                ]"
                class="w-5 h-5 top-0 right-0 bottom-0 absolute transform -translate-y-1.5"
              />
              <ChevronDownIcon
                :class="[
                  sortOrder === 'DESC' && sortKey === item.key
                    ? 'text-gray-500'
                    : 'text-gray-300',
                ]"
                class="w-5 h-5 top-0 right-0 bottom-0 absolute transform translate-y-1.5"
              />
            </button>
            <template v-else>
              <slot :name="`head-${item.key}`">
                {{ item.name }}
              </slot>
            </template>
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
        v-for="(dataItem, index) in sortedData"
        :key="index"
        class="divide-x divide-gray-100"
      >
        <template v-for="headItem in head" :key="headItem.name">
          <TableData
            :class="{
              'md:sticky right-0 text-right space-x-3 md:!border-l-0':
                headItem.key === 'action',
            }"
          >
            <slot
              v-if="headItem.key === 'action'"
              :item="dataItem"
              name="action"
            />
            <slot v-else :item="dataItem" :name="headItem.key">
              {{ getValue(dataItem, headItem.key) }}
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
      <TableRow>
        <TableData :colspan="head.length - 1" />
        <TableData class="text-right !py-2.5 md:sticky right-0">
          <span v-if="!innerLoading && data">{{ data.length }} Total</span>
          <span v-else>Loading...</span>
        </TableData>
      </TableRow>
    </TableBody>
  </TableTable>
</template>

<script lang="ts" setup>
import TableTable from "./TableTable.vue";
import TableData from "./TableData.vue";
import TableBody from "./TableBody.vue";
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import TableHeader from "./TableHeader.vue";
import { computed, PropType, ref, toRefs } from "vue";
import { JsonModel } from "../types/shared";
import CircleLoader from "./CircleLoader.vue";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  head: {
    type: Array as PropType<
      { key: string; name: string; sortable?: boolean }[]
    >,
    required: true,
  },
  data: {
    type: Array as PropType<JsonModel[] | null>,
    required: false,
    default: null,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  getValueFunc: {
    type: Function as PropType<
      // eslint-disable-next-line no-unused-vars
      (item: JsonModel, sortKey: string) => string | number
    >,
    required: false,
    default: null,
  },
  sortOrder: {
    type: String,
    required: false,
    default: "",
  },
  sortKey: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["update:sortOrder", "update:sortKey"]);

const {
  loading,
  data,
  getValueFunc,
  sortOrder: sortOrderProp,
  sortKey: sortKeyProp,
} = toRefs(props);

const innerLoading = computed(() => {
  return loading.value || data.value === null;
});

const sortOrder = ref(sortOrderProp.value);
const sortKey = ref(sortKeyProp.value);

const changeSortOrder = () => {
  if (sortOrder.value === "") sortOrder.value = "ASC";
  else if (sortOrder.value === "ASC") sortOrder.value = "DESC";
  else if (sortOrder.value === "DESC") {
    sortOrder.value = "";
    sortKey.value = "";
  }
};

const changeSort = (value: string) => {
  if (value === sortKey.value) {
    changeSortOrder();
  } else {
    sortKey.value = value;
    sortOrder.value = "ASC";
  }
  emit("update:sortKey", sortKey.value);
  emit("update:sortOrder", sortOrder.value);
};

function getValueDefault(item: JsonModel, key: string): string | number {
  const val = item[key];
  if (val !== undefined)
    if (typeof val === "number") return val;
    else return String(val);
  return "";
}

function getValue(item: JsonModel, key: string): string | number {
  if (getValueFunc.value) return getValueFunc.value(item, key);
  return getValueDefault(item, key);
}

function compare(val1: string | number, val2: string | number): number {
  if (typeof val1 === "number" && typeof val2 === "number") {
    return val1 - val2;
  }
  return String(val1).localeCompare(String(val2));
}

function schwartzSort(items: JsonModel[]): JsonModel[] {
  const modifier = sortOrder.value === "ASC" ? 1 : -1;
  const tuples: [JsonModel, string | number][] = items.map((i) => [
    i,
    getValue(i, sortKey.value),
  ]);
  tuples.sort((first, second) => compare(first[1], second[1]) * modifier);
  const result = tuples.map((tuple) => tuple[0]);
  return result;
}

const sortedData = computed(() => {
  if (data.value === null) return null;
  const sortedRecords = schwartzSort([...data.value]);
  return sortedRecords;
});
</script>
