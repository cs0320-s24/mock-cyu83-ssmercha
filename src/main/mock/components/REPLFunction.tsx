export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

export function view(args: Array<string>): string | string[][] {
  let array: string[][] = [
    ["1", "2", "3"],
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return array;
}

export function search(args: Array<string>): string | string[][] {
  let array: string[][] = [
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return array;
}

export function loadCSV(args: Array<string>): string | string[][] {
  return args.toString();
}

export function mode(args: Array<string>): string | string[][] {
  return args.toString();
}
