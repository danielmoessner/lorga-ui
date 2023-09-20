export type FormOptionInput =
  | {
      name?: string;
      value?: string | number;
      id?: number | string;
      uuid?: string;
      required?: boolean;
    }
  | string;

export type FormOption = {
  name: string;
  value: string;
};

type BaseField = {
  label: string;
  name: string;
  autocomplete?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  helptext?: string;
};

type InputField = BaseField & {
  type:
    | "textarea" // form textarea
    | "toggle" // form checkbox
    | "file" // form file
    | "files" // form files
    | "list" // form list
    | "custom"
    // form input
    | "button"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
};

type OptionsField = BaseField & {
  type:
    | "multiple" // form multiple
    | "select" // form select
    | "combobox" // form combobox
    | "searchselect" // form searchselect
    | "datalist" // form datalist
    | "checkbox"; // form checkbox
  options: FormOptionInput[];
};

type NestedField = { type: "fields"; name: string; fields: FormField[] };

type SlotField = { type: "slot"; name: string };

type ArrayField = {
  type: "array";
  name: string;
  defaultAmount?: number;
  fields: FormField[];
  addButtonText?: string;
  removeButtonText?: string;
};

export type FormField =
  | InputField
  | OptionsField
  | NestedField
  | SlotField
  | ArrayField;
