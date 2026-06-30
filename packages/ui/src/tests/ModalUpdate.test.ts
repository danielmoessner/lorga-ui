import ModalUpdate from "@/components/ModalUpdate.vue";
import { mount } from "@vue/test-utils";
import { FormField } from "src/types";

const fields: FormField[] = [
  {
    name: "test01",
    label: "Test 01",
    type: "text",
    required: true,
  },
  {
    name: "test02",
    label: "Test 02",
    type: "text",
    required: true,
  },
  {
    name: "nested",
    type: "fields",
    fields: [
      {
        name: "test11",
        label: "Test 11",
        type: "text",
        required: true,
      },
      {
        name: "test12",
        label: "Test 12",
        type: "text",
        required: true,
      },
    ],
  },
];

describe("modal update", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

  it("exposes the form", async () => {
    const request = () => Promise.resolve();

    const data = { test: "test" };

    const modal = mount(ModalUpdate, {
      props: {
        fields: fields,
        request: request,
        data: data,
        modelValue: true,
      },
    });

    await modal.vm.$nextTick();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    modal.vm.form!.data!["test1"] = "test1";

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(modal.vm.form!.internalData).toEqual({
      test: "test",
      test1: "test1",
    });
  });
});
