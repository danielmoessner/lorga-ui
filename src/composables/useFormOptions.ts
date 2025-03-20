import { Ref, computed } from "vue";
import { FormOption, FormOptionInput } from "../types/form";

const useFormOptions = (options: Ref<FormOptionInput[] | undefined>) => {
  const formOptions = computed<FormOption[]>(() => {
    if (!options || !options.value) return [];
    return options.value.map((o: FormOptionInput) => {
      if (typeof o === "string")
        return {
          name: o,
          value: o,
        };
      else {
        let value: string | undefined | number | null | boolean = null;
        if (Object.hasOwn(o, "value")) value = o.value;
        else if (Object.hasOwn(o, "id")) value = o.id;
        else if (Object.hasOwn(o, "uuid")) value = o.uuid;
        return {
          name: o.name || "-",
          value: value,
        };
      }
    });
  });

  return {
    formOptions,
  };
};

export default useFormOptions;
