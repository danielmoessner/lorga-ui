import { computed } from "vue";
import { FormOption, FormOptionInput } from "../types/form";

const useFormOptions = (options: FormOptionInput[] | undefined) => {
  const formOptions = computed<FormOption[]>(() => {
    if (!options) return [];
    return options.map((o: FormOptionInput) => {
      if (typeof o === "string")
        return {
          name: o,
          value: o,
        };
      else {
        let value = "-";
        if (o.value) value = String(o.value);
        else if (o.id) value = String(o.id);
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
