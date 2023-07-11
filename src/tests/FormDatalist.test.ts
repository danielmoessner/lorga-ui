import FormDatalistVue from "src/components/FormDatalist.vue";
import { mount } from "@vue/test-utils";

describe("form datalist", () => {
  it("shows label and helptext", async () => {
    const datalist = mount(FormDatalistVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
      },
    });

    expect(datalist.text()).toContain("Test 01");
    expect(datalist.text()).toContain("Help text 23");
  });

  it("updates model value", async () => {
    const datalist = mount(FormDatalistVue, {
      props: {
        label: "Test 01",
        helptext: "Help text 23",
        modelValue: "initialText",
        "onUpdate:modelValue": (e) => datalist.setProps({ modelValue: e }),
      },
    });

    await datalist.find("input").setValue("newText");
    expect(datalist.props("modelValue")).toBe("newText");
  });

  it("includes the options", async () => {
    const datalist = mount(FormDatalistVue, {
      props: {
        label: "Test 01",
        options: ["option1", "option2"],
      },
    });

    expect(datalist.html()).toContain("option1");
    expect(datalist.html()).toContain("option2");
  });
});
