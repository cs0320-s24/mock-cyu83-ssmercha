import { Dispatch, SetStateAction, useState } from "react";
import { REPLProps } from "./PropsInterface";

export interface REPLFunction {
  (props: REPLProps, args: Array<string>): string | string[][] | boolean;
}

export function mockViewCSV(
  props: REPLProps,
  args: Array<string>
): string | string[][] | boolean {
  let mockData: string[][] = [
    ["1", "2", "3"],
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return mockData;
}

export function mockSearchCSV(
  props: REPLProps,
  args: Array<string>
): string | string[][] | boolean {
  let mockResults: string[][] = [
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return mockResults;
}

export function mockLoadCSV(
  props: REPLProps,
  args: Array<string>
): string | string[][] | boolean {
  return args.toString();
}

export function mode(
  props: REPLProps,
  args: Array<string>
): string | string[][] | boolean {
  if (args.length == 1 && args[0] == "brief") {
    props.setMode(true);
    return "Mode switched to brief!";
  } else if (args.length == 1 && args[0] == "verbose") {
    return "Mode switched to verbose!";
  } else {
    return "Invalid input!";
  }
}
