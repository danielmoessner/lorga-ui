import { mount } from "@vue/test-utils";
import FormListVue from "@/components/FormList.vue";

describe("form datalist", () => {
  it("shows label and helptext", async () => {
    const formlist = mount(FormListVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
        name: "test",
        modelValue: ["initialText"],
        getError: () => [],
      },
    });

    expect(formlist.text()).toContain("Test 01");
    expect(formlist.text()).toContain("Help text 23");
  });
  it("shows the model value", async () => {
    const formlist = mount(FormListVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
        name: "test",
        modelValue: ["Custom Value 1", "Another Value 2"],
        getError: () => [],
      },
    });

    const inputValues = await formlist.findAll("input");
    expect(inputValues[0].element.value).toBe("Custom Value 1");
    expect(inputValues[1].element.value).toBe("Another Value 2");
  });
  it("shows the list item errors", async () => {
    const formlist = mount(FormListVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
        name: "test",
        modelValue: ["Custom Value 1", "Another Value 2"],
        getError: (index: (string | number)[]) =>
          index[0] === 1 ? ["error on value 2"] : [],
      },
    });
    expect(formlist.text()).toContain("error on value 2");
  });
});
