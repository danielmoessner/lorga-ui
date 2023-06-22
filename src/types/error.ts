export interface ICommandError {
  paramErrors: { [key: string]: string[] };
  generalErrors: string[];
  title: string;
}
