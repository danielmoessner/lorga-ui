import FormFields from "@/components/FormFields.vue";
import { FormField } from "../types/form";
import { mount } from "@vue/test-utils";

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
    name: "slot03",
    type: "slot",
  },
];

describe("form fields", () => {
  it("has slot fields", async () => {
    const text = "My Custom Slot Content";

    const formfields = mount(FormFields, {
      props: {
        fields: fields,
        onUpdate: () => {
          /* do nothing */
        },
        data: {},
        getError: () => [],
      },
      slots: {
        slot03: text,
      },
    });

    expect(formfields.text()).toContain(text);
  });

  it("shows textarea helpotext", async () => {
    const formfields = mount(FormFields, {
      props: {
        fields: [
          {
            label: "Textarea",
            name: "textarea",
            type: "textarea",
            helptext: "This is a help text",
          },
        ],
        onUpdate: () => {
          /* do nothing */
        },
        data: {},
        getError: () => [],
      },
    });

    expect(formfields.text()).toContain("This is a help text");
  });
});
