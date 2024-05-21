import { configKey } from "@/config";
import { TableGenerator } from "../index";
import { mount } from "@vue/test-utils";

describe("table", () => {
  it("classes can be overwritten", async () => {
    const data = [
      {
        name: "John",
        age: 25,
        city: "New York",
        long: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      },
      { name: "Jane", age: 24, city: "New York" },
      { name: "Joe", age: 28, city: "New York" },
    ];

    const head = [
      { name: "Name", key: "name" },
      { name: "Age", key: "age" },
      { name: "City", key: "city" },
      { name: "Long", key: "long" },
      { name: "Action", key: "action" },
    ];

    const key = configKey as symbol;

    const table = mount(TableGenerator, {
      props: {
        head: head,
        data: data,
      },
      global: {
        provide: {
          [key]: {
            table: {
              td: "some-fancy-styled-class",
            },
          },
        },
      },
    });

    const td = await table.findAll("td");
    expect(td[0].classes()).toContain("some-fancy-styled-class");
  });
});
