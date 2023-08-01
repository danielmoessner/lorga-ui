export interface ICommandError {
  paramErrors: { [key: string]: string[] | ICommandError["paramErrors"] };
  generalErrors: string[];
  title: string;
}
