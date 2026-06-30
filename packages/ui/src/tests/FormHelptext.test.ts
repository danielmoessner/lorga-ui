import { mount } from "@vue/test-utils";
import FormHelptext from "@/components/FormHelptext.vue";

describe("form datalist", () => {
  it("wraps to new line", async () => {
    const helptext = mount(FormHelptext, {
      props: {
        helptext: "Firstline\nSecondline",
      },
    });

    expect(helptext.text()).toBe("Firstline\nSecondline");
  });
});
