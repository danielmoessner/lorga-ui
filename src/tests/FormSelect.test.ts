import { mount } from "@vue/test-utils";
import FormSelectVue from "@/components/FormSelect.vue";
import { defineComponent, ref } from "vue";

function getParent() {
  return defineComponent({
    components: { FormSelectVue },
    setup() {
      const options = ref([{ name: "one", value: "1" }]);
      const modelValue = ref<string>();
      return { options, modelValue };
    },
    template: `
          <FormSelectVue
            :options="options"
            v-model="modelValue"
            label="Test 01"
            helptext="Help text 23"
            name="test"
            :getError="() => []"
          />
        `,
  });
}

describe("form select", () => {
  it("updates options dynamically", async () => {
    const Parent = getParent();

    const wrapper = mount(Parent);
    expect(wrapper.text()).toContain("one");

    // update the reactive ref
    wrapper.vm.options = [{ name: "two", value: "2" }];
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("two");
  });

  it("v-model works", async () => {
    const Parent = getParent();

    const wrapper = mount(Parent);
    const select = wrapper.find("select");
    await select.setValue("1");
    expect(wrapper.vm.modelValue).toBe("1");
  });
});
