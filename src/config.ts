import { InjectionKey, inject, provide } from "vue";

export const DEFAULT_CONFIG = {
  table: {
    th: "",
    td: "px-6 py-4 text-sm text-gray-500 bg-white whitespace-nowrap",
    tdAction: "md:sticky right-0 text-right space-x-3 md:!border-l-0",
    table: "",
  },
};

export const configKey = Symbol() as InjectionKey<typeof DEFAULT_CONFIG>;

export function useConfig() {
  const config = inject(configKey, DEFAULT_CONFIG);

  const overwrite = (key: string, value: string) => {
    const ks = key.split(".");
    ks.reduce((acc: unknown, k: string, i: number) => {
      if (typeof acc !== "object" || acc === null) {
        throw new Error(`Invalid key: ${key} for ${JSON.stringify(acc)}`);
      }
      if (i === ks.length - 1) {
        acc[k] = value;
      } else {
        return acc[k];
      }
    }, config);
  };

  return { config, overwrite };
}

export function setupConfig() {
  provide(configKey, DEFAULT_CONFIG);
}
