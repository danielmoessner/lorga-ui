<script setup lang="ts">
import { computed, toRefs } from "vue";
import PaginationStuff from "./PaginationStuff.vue";

export type QueryParams = Record<
  string,
  number | string | string[] | null | boolean | undefined
>;

export type SetQueryParam = (
  // eslint-disable-next-line no-unused-vars
  key: string,
  // eslint-disable-next-line no-unused-vars
  value: string | number | string[] | null | boolean | undefined,
) => QueryParams;

const props = defineProps<{
  setQueryParam: SetQueryParam;
  queryParams: QueryParams;
  total?: number;
}>();

const { setQueryParam, total, queryParams } = toRefs(props);

const perPage = computed(() => {
  const limit: number | undefined = queryParams.value.limit as
    | number
    | undefined;
  const offset: number | undefined = queryParams.value.offset as
    | number
    | undefined;
  const perPage = (limit ?? 10) - (offset ?? 0);
  return perPage;
});

const limit = computed(() => {
  return (queryParams.value.limit as number) || 10;
});

const offset = computed(() => {
  return (queryParams.value.offset as number) || 0;
});

const page = computed({
  get: () => {
    return Math.floor(offset.value / perPage.value) + 1;
  },
  set: (newValue) => {
    const offset = (newValue - 1) * perPage.value;
    const limit = newValue * perPage.value;
    setQueryParam.value("offset", offset);
    setQueryParam.value("limit", limit);
  },
});

const prev = () => {
  if (page.value > 1) page.value--;
};

const next = () => {
  if (!(total?.value && page.value >= total.value / perPage.value))
    page.value++;
};

const setPerPage = (value: number) => {
  setQueryParam.value("limit", value);
  setQueryParam.value("offset", 0);
};

const totalPages = computed(() => {
  return total?.value ? Math.ceil(total.value / perPage.value) : 0;
});

const changePage = (value: number) => {
  page.value = value;
};
</script>

<template>
  <div>
    <PaginationStuff
      class="mt-4"
      :per-page="perPage"
      :prev="prev"
      :next="next"
      :page="page"
      :total-pages="totalPages"
      :set-per-page="setPerPage"
      :change-page="changePage"
      :limit="limit"
      :offset="offset"
      :total="total"
    />
  </div>
</template>
