import TableSortable from "src/components/TableSortable.vue";
import { mount } from "@vue/test-utils";

describe("table sortable", () => {
  it("uses the display func", () => {
    const data = [
      { a: 1, b: 1 },
      { a: 2, b: 2 },
    ];

    const head = [
      { name: "A", key: "a" },
      { name: "B", key: "b" },
    ];

    const getDisplayValueFunc = () => "displayValue";

    const modal = mount(TableSortable, {
      props: {
        head: head,
        data: data,
        getDisplayValueFunc: getDisplayValueFunc,
        modelValue: true,
      },
    });

    expect(modal.text()).toContain("displayValue");
  });
});
