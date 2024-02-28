import { Dispatch, SetStateAction, useState } from "react";

// create mock csv file data
const mockFileData: Map<string, string[][]> = new Map();
mockFileData.set("test.csv", [
  ["1", "2", "3"],
  ["a", "b", "c"],
  ["d", "e", "f"],
]);
mockFileData.set("people.csv", [
  ["name", "age", "fav_color"],
  ["catherine", "19", "blue"],
  ["sana", "19", "green"],
]);

export function mockViewCSV(
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: Array<string>
): string | string[][] {
  let data = mockFileData.get(args[0]);
  if (data != undefined) {
    return data;
  } else {
    return "File does not exist!";
  }
}

export function mockSearchCSV(
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: Array<string>
): string | string[][] {
  let mockResults: string[][] = [
    ["hi", "hi", "hi"],
    ["hello", "hello", "hello"],
  ];
  return mockResults;
}

export function mockLoadCSV(
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: Array<string>
): string | string[][] {
  return args.toString();
}

export function mode(
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: Array<string>
): string | string[][] {
  if (args.length == 1 && args[0] == "brief") {
    setModeIsBrief(true);
    return "Mode switched to brief!";
  } else if (args.length == 1 && args[0] == "verbose") {
    setModeIsBrief(false);
    return "Mode switched to verbose!";
  } else {
    return "Invalid input!";
  }
}
