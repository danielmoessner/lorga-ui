import { InjectionKey, inject, provide } from "vue";

export const DEFAULT_CONFIG = {
  table: {
    th: "px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 whitespace-nowrap",
    td: "px-6 py-4 text-sm text-gray-500 bg-white whitespace-nowrap",
    tdAction: "md:sticky right-0 text-right space-x-3 md:!border-l-0",
    table: "min-w-full divide-y divide-gray-200",
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
