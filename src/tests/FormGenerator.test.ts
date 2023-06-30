import { FormGenerator } from "src";
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

describe("form generator", () => {
  it("shows nested fields", async () => {
    const generator = mount(FormGenerator, {
      props: {
        fields: fields,
        request: () => Promise.resolve(),
      },
    });
    expect(generator).toBeTruthy();

    const label = generator.find("label");
    expect(label.text()).toContain("Test 01");

    expect(generator.text()).toContain("Test 12");
  });
});
