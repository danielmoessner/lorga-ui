import { mount } from "@vue/test-utils";
import FormSingleCheckboxVue from "@/components/FormSingleCheckbox.vue";

describe("form singlecheckbox", () => {
  it("shows label and helptext", async () => {
    const formcheckbox = mount(FormSingleCheckboxVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
        name: "test",
      },
    });

    expect(formcheckbox.text()).toContain("Test 01");
    expect(formcheckbox.text()).toContain("Help text 23");
  });
  it("shows the model value", async () => {
    const formcheckbox = mount(FormSingleCheckboxVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
        name: "test",
        modelValue: true,
      },
    });

    const input = await formcheckbox.find("input");
    expect(input.element.checked).toBe(true);
  });
});
