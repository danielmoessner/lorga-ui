const setNestedValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  loc: string[],
  value: unknown,
) => {
  let schema = data;
  const len = loc.length;
  for (let i = 0; i < len - 1; i++) {
    const elem = loc[i];
    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }
  schema[loc[len - 1]] = value;
};

export type Nested<T> = { [key: string]: T[] | Nested<T> };

function getNestedValue<T>(data: Nested<T>, loc: (string | number)[]): T[] {
  let schema: T[] | Nested<T> = data;
  const len = loc.length;
  for (let i = 0; i < len; i++) {
    const elem = loc[i];
    if (!schema[elem]) return [];
    schema = schema[elem];
  }
  if (Array.isArray(schema)) return schema;
  return [];
}

export { setNestedValue, getNestedValue };
