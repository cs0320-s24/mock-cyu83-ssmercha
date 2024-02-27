import { Dispatch, SetStateAction, useState } from "react";
// import { REPLProps } from "./PropsInterface";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

export function mockViewCSV(args: Array<string>): string | string[][] {
  let mockData: string[][] = [
    ["1", "2", "3"],
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return mockData;
}

export function mockSearchCSV(args: Array<string>): string | string[][] {
  let mockResults: string[][] = [
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return mockResults;
}

export function mockLoadCSV(args: Array<string>): string | string[][] {
  return args.toString();
}

export function mode(args: Array<string>): string | string[][] {
  if (args.length == 1 && args[0] == "brief") {
    // props.setModeIsBrief(true);
    return "Mode (not) switched to brief!";
  } else if (args.length == 1 && args[0] == "verbose") {
    // props.setModeIsBrief(false);
    return "Mode (not) switched to verbose!";
  } else {
    return "Invalid input!";
  }
}
