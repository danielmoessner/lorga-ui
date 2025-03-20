import { mount } from "@vue/test-utils";
import FormSelectVue from "@/components/FormSelect.vue";
import { defineComponent, ref } from "vue";

describe("form select", () => {
  it("updates options dynamically", async () => {
    const Parent = defineComponent({
      components: { FormSelectVue },
      setup() {
        const options = ref([{ name: "one", value: "1" }]);
        const modelValue = ref<string>();
        return { options, modelValue };
      },
      template: `
        <FormSelectVue
          :options="options"
          :modelValue="modelValue"
          label="Test 01"
          helptext="Help text 23"
          name="test"
          :getError="() => []"
        />
      `,
    });

    const wrapper = mount(Parent);
    expect(wrapper.text()).toContain("one");

    // update the reactive ref
    wrapper.vm.options = [{ name: "two", value: "2" }];
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("two");
  });
});
