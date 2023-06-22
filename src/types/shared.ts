export type RequestFunction = (...args: any[]) => Promise<any | void>; // eslint-disable-line

export type JsonModel = {
  [key: string]: any; // eslint-disable-line
};
