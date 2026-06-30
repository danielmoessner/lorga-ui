export type AlertItem = {
  id: string;
  type: "success" | "error";
  heading: string;
  message: string;
  created: number;
};
