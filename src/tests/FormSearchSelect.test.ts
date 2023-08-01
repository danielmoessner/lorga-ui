import { FormSearchSelect } from "src";
import { mount } from "@vue/test-utils";

describe("form search select", () => {
  it("updates automatically", async () => {
    const searchselect = mount(FormSearchSelect, {
      props: {
        label: "Test",
        name: "test",
        options: [
          { id: "1", name: "One" },
          { id: "2", name: "Two" },
        ],
        modelValue: "1",
        "onUpdate:modelValue": (e) => searchselect.setProps({ modelValue: e }),
      },
    });
    expect(searchselect).toBeTruthy();

    const input = await searchselect.find("input");

    expect(input.element.value).toBe("One");

    const select = await searchselect.find("select");

    await input.setValue("Two");

    expect(select.element.value).toBe("2");
  });
});
