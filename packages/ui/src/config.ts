import { InjectionKey, inject, provide } from "vue";

export const DEFAULT_CONFIG = {
  table: {
    th: "px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 whitespace-nowrap",
    td: "px-6 py-4 text-sm text-gray-500 bg-white whitespace-nowrap",
    tdAction: "md:sticky right-0 text-right space-x-3 md:border-l-0!",
    table: "min-w-full divide-y divide-gray-200",
  },
  button: {
    primary: {
      color:
        "border shadow-sm border-transparent text-white bg-formcolor hover:bg-formcolor/90 focus:ring-2 focus:ring-offset-2 focus:ring-formcolor",
      size: "px-4 py-2 text-sm font-medium rounded-xl",
    },
    secondary: {
      color:
        "border shadow-sm border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200",
      size: "px-4 py-2 text-sm font-medium rounded-xl",
    },
    outline: {
      color:
        "border shadow-sm border-indigo-600 text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-indigo-50 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
      size: "px-4 py-2 text-sm font-medium rounded-xl",
    },
    link: {
      color: "underline text-formcolor hover:text-opacity-75 focus:ring-0",
      size: "",
    },
    action: {
      color:
        "border border-transparent text-blue-700 hover:text-blue-900 hover:bg-blue-50 focus:border-blue-200",
      size: "px-2 py-0.5 text-sm font-medium rounded-md -mx-2 hover:z-10 hover:relative",
    },
    delete: {
      color:
        "border border-transparent text-red-600 hover:text-red-700 hover:bg-red-50 focus:border-red-200",
      size: "px-2 py-0.5 text-sm font-medium rounded-md -mx-2 hover:z-10 hover:relative",
    },
    disabled: "pointer-events-none opacity-80 cursor-not-allowed",
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
