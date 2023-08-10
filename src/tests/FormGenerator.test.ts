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
        fields: fields,
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
        fields: fields,
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
        fields: fields,
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
        fields: fields,
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
        fields: fields,
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
});
