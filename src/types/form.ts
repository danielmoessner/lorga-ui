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

export interface IRawFormField {
  label: string;
  name: string;
  type:
    | "multiple" // form multiple
    | "list" // form list
    | "select" // form select
    | "textarea" // form textarea
    | "toggle" // form checkbox
    | "file" // form file
    | "files" // form files
    | "combobox" // form combobox
    | "searchselect" // form searchselect
    | "custom"
    // form input
    | "checkbox"
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
  autocomplete?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: FormOptionInput[];
  room?: string;
  helptext?: string;
}

export type FormField =
  | IRawFormField
  | { type: "fields"; name: string; fields: IRawFormField[] };
