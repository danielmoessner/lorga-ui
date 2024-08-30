import FormGenerator from "@/components/FormGenerator.vue";
import { mount } from "@vue/test-utils";
import { FormField } from "src/types";

const nestedFields: FormField[] = [
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
      {
        name: "test13",
        type: "searchselect",
        label: "Test 13",
        required: true,
        options: [
          { id: "1", name: "One" },
          { id: "2", name: "Two" },
        ],
      },
    ],
  },
];

const arrayFields: FormField[] = [
  {
    name: "wheels",
    type: "array",
    fields: [
      {
        name: "type",
        label: "Type",
        type: "text",
        required: true,
      },
      {
        name: "size",
        label: "Size",
        type: "searchselect",
        required: true,
        options: [
          { id: "1", name: "One" },
          { id: "2", name: "Two" },
        ],
      },
    ],
  },
  {
    name: "power",
    label: "Power",
    type: "number",
    required: true,
  },
];

describe("form generator", () => {
  it("shows nested fields", async () => {
    const generator = mount(FormGenerator, {
      props: {
        fields: nestedFields,
        request: () => Promise.resolve(),
      },
    });
    expect(generator).toBeTruthy();

    const label = generator.find("label");
    expect(label.text()).toContain("Test 01");

    expect(generator.text()).toContain("Test 12");
  });

  it("shows errors", async () => {
    const request = () =>
      Promise.reject({
        paramErrors: {
          test01: ["Error01"],
          nested: { test11: ["Error11"] },
        },
        title: "Request Param Error",
      });

    const generator = mount(FormGenerator, {
      props: {
        fields: nestedFields,
        request: request,
      },
    });

    await generator.find("form").trigger("submit");

    expect(generator.text()).toContain("Error01");
    expect(generator.text()).toContain("Error11");
  });

  it("shows title error", async () => {
    const request = () => Promise.reject({ title: "Command Not Found" });

    const data = { test: "test" };

    const form = mount(FormGenerator, {
      props: {
        fields: nestedFields,
        request: request,
        data: data,
        modelValue: true,
      },
    });

    await form.find("form").trigger("submit");

    expect(form.text()).toContain("Command Not Found");
  });

  it("exposes the data", async () => {
    const request = () => Promise.resolve();

    const data = { test: "test" };

    const generator = mount(FormGenerator, {
      props: {
        fields: nestedFields,
        request: request,
        data: data,
      },
    });

    expect(generator.vm.internalData).toEqual(data);

    generator.vm.internalData["test1"] = "test1";

    expect(generator.vm.internalData["test1"]).toEqual("test1");
  });

  it("updates exposed data", async () => {
    const request = () => Promise.resolve();

    const data = { test: "test" };

    const generator = mount(FormGenerator, {
      props: {
        fields: nestedFields,
        request: request,
        data: data,
      },
    });

    const input = await generator.find("input");
    await input.setValue("testInput");

    expect(generator.vm.internalData["test01"]).toEqual("testInput");
  });

  it("updates nested data", async () => {
    const request = () => Promise.resolve();

    const data = {};

    const generator = mount(FormGenerator, {
      props: {
        fields: nestedFields,
        request: request,
        data: data,
      },
    });

    const input = await generator.find("input[name='test12']");
    await input.setValue("testInput");

    expect(generator.vm.internalData["nested"]["test12"]).toEqual("testInput");

    const input2 = await generator.find("select[name='test13']");
    await input2.setValue("1");

    expect("1").toEqual(generator.vm.internalData["nested"]["test13"]);
  });

  it("shows array fields", async () => {
    const request = () => Promise.resolve();

    const data = {};

    const generator = await mount(FormGenerator, {
      props: {
        fields: arrayFields,
        request: request,
        data: data,
      },
    });

    const label = await generator.find("label");
    expect(label.text()).toContain("Type");
  });

  it("adds array fields", async () => {
    const request = () => Promise.resolve();

    const data = {};

    const generator = await mount(FormGenerator, {
      props: {
        fields: arrayFields,
        request: request,
        data: data,
      },
    });

    const button = await generator.find("#wheels-add-button");
    await button.trigger("click");

    expect(generator.vm.internalData["wheels"].length).toEqual(2);

    const removeButton = await generator.find("#wheels-remove-button");
    await removeButton.trigger("click");

    expect(generator.vm.internalData["wheels"].length).toEqual(1);
  });

  it("sets array fields data", async () => {
    const request = () => Promise.resolve();

    const data = {
      wheels: [
        {
          type: "test",
          size: "1",
        },
      ],
    };

    const generator = await mount(FormGenerator, {
      props: {
        fields: arrayFields,
        request: request,
        data: data,
      },
    });

    const input = await generator.find("input[name='type']");
    await input.setValue("winter");

    expect(generator.vm.internalData["wheels"][0]["type"]).toEqual("winter");
  });

  it("sends success event", async () => {
    const request = () => Promise.resolve({ data: "success" });

    const data = {};

    const generator = await mount(FormGenerator, {
      props: {
        fields: arrayFields,
        request: request,
        data: data,
      },
    });

    await generator.find("form").trigger("submit");

    expect(generator.emitted("success")).toBeTruthy();
  });
});
