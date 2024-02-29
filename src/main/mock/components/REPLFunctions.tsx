import { Dispatch, SetStateAction, useState } from "react";
import { REPLFunction } from "./FunctionInterface";

// create mock csv file data
const mockFileData: Map<string, string[][]> = new Map();
mockFileData.set("test.csv", [
  ["1", "2", "3"],
  ["a", "b", "c"],
  ["d", "e", "f"],
]);
mockFileData.set("people.csv", [
  ["name", "age", "color"],
  ["catherine", "19", "blue"],
  ["sana", "19", "green"],
]);

let fileLoaded = "";

// stores search arguments --> search results
const mockSearchData: Map<string[], string[][]> = new Map();
mockSearchData.set(
  ["people.csv", "age", "19"],
  [
    ["catherine", "19", "blue"],
    ["sana", "19", "green"],
  ]
);
mockSearchData.set(["people.csv", "color", "green"], [["sana", "19", "green"]]);
mockSearchData.set(["test.csv", "name", "blah"], []);
mockSearchData.set(["people.csv", "name", "green"], []);

export function mockViewCSV(
  cmdMap: Map<string, REPLFunction>,
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: string[]
): string | string[][] {
  if (args.length != 1) {
    return 'Incorrect number of arguments inputted. Please input "view <file_name>"';
  }
  if (fileLoaded == args[0]) {
    let data = mockFileData.get(args[0]);
    if (data != undefined) {
      return data;
    } else {
      return "File does not exist!";
    }
  } else {
    return "Please load the file " + args[0] + " before viewing!";
  }
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length == b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// enter search <column> <value>, <column> is either and index or column name
export function mockSearchCSV(
  cmdMap: Map<string, REPLFunction>,
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: string[]
): string | string[][] {
  if (args.length != 3) {
    // TODO: check if <column> is a required arg
    return 'Incorrect number of arguments inputted. Please input "search <column> <value>"'; // TODO: check
  }

  if (fileLoaded == args[0]) {
    if (args[0] == "people.csv") {
      if (args[1] == "age" && args[2] == "19") {
        return [
          ["catherine", "19", "blue"],
          ["sana", "19", "green"],
        ];
      }
      if (args[1] == "color" && args[2] == "green") {
        return [["sana", "19", "green"]];
      }
      if (args[1] == "name" && args[2] == "green") {
        return [];
      }
    }
    if (args[0] == "test.csv") {
      if (args[1] == "name" && args[2] == "blah") {
        return [];
      }
    }
    return "Invalid search arguments/mocked search doesn't have those results!";
  }
  // Array.from(mockSearchData.keys()).forEach((key) => {
  // if (arraysEqual(key, args)) {
  // let searchResults = mockSearchData.get(key);
  // if (searchResults != undefined) {
  //   return searchResults;
  // } else {
  //   return "Invalid search arguments!";
  // }
  //     //   } else {
  //     //     return "Invalid search arguments!";
  // } else {
  //   return "idk what happened";
  // }
  // });
  // return "No mock search data";
  else {
    return "Please load the file " + args[0] + " before searching!";
  }
}

export function mockLoadCSV(
  cmdMap: Map<string, REPLFunction>,
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: string[]
): string | string[][] {
  if (args.length != 1) {
    return 'Incorrect number of arguments inputted. Please input "load <file_name>"';
  }
  if (fileLoaded == args[0]) {
    return "File already loaded!";
  } else {
    // TODO: load data into file data
    if (mockFileData.has(args[0])) {
      fileLoaded = args[0];
      return "Loaded file " + args[0];
    } else {
      return "File " + args[0] + " does not exist!";
    }
  }
}

export function mode(
  cmdMap: Map<string, REPLFunction>,
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: string[]
): string | string[][] {
  if (args.length != 1) {
    return 'Incorrect number of arguments inputted. Please input "mode <brief/verbose>"';
  }
  if (args[0] == "brief") {
    setModeIsBrief(true);
    return "Mode switched to brief!";
  } else if (args.length == 1 && args[0] == "verbose") {
    setModeIsBrief(false);
    return "Mode switched to verbose!";
  } else {
    return 'Invalid input! Please input "mode <brief/verbose>"';
  }
}
