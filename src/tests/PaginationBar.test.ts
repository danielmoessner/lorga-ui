import { ref } from "vue";
import PaginationBar, { QueryParams } from "../components/PaginationBar.vue";
import { mount } from "@vue/test-utils";

describe("pagination", () => {
  it("prev and next works", async () => {
    const total = 100;
    const queryParams = ref<QueryParams>({
      page: 1,
      limit: 10,
    });
    const setQueryParam = (key, value) => {
      queryParams.value[key] = value;
      return queryParams.value;
    };

    const pagination = mount(PaginationBar, {
      props: {
        queryParams: queryParams.value,
        setQueryParam: setQueryParam,
        total: total,
      },
    });

    expect(pagination.text()).toContain("Showing page 1 of 10");

    const prev = pagination.find("#pagination-bar-prev");
    prev.trigger("click");
    expect(pagination.text()).toContain("Showing page 1 of 10");

    const next = pagination.find("#pagination-bar-next");
    next.trigger("click");
    await pagination.vm.$nextTick();
    expect(pagination.text()).toContain("Showing page 2 of 10");

    const select = pagination.find("#pagination-bar-which-page");
    select.setValue(3);
    await pagination.vm.$nextTick();
    expect(pagination.text()).toContain("Showing page 3 of 10");
  });

  it("per page works", async () => {
    const total = 100;
    const queryParams = ref<QueryParams>({
      page: 1,
      limit: 10,
      offset: 0,
    });
    const setQueryParam = (key, value) => {
      queryParams.value[key] = value;
      return queryParams.value;
    };

    const pagination = mount(PaginationBar, {
      props: {
        queryParams: queryParams.value,
        setQueryParam: setQueryParam,
        total: total,
      },
    });

    const info = pagination.find("#pagination-bar-info");

    const select = pagination.find("#pagination-bar-per-page");
    select.setValue(20);
    await pagination.vm.$nextTick();
    expect(info.text()).toContain("Showing page 1 of 5");
  });
});
