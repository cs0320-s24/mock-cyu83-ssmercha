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

const pplAge = ["people.csv", "19", "n", "age"];
const pplColor = ["people.csv", "green", "n", "color"];
const testName = ["test.csv", "x", "n", "name"];
const pplName = ["people.csv", "green", "n", "name"];
const pplIndex = ["people.csv", "catherine", "i", "0"];
const ppl19 = ["people.csv", "19"];
const testA = ["test.csv", "a"];
const testZ = ["test.csv", "z"];

const sampleSearches: string[][] = [
  pplAge,
  pplColor,
  testName,
  pplName,
  pplIndex,
  ppl19,
  testA,
  testZ,
];

// returns empty list if given argslist not found in sampleSearches
function samplesContain(args: string[]): string[] {
  // TODO
  for (let i = 0; i < sampleSearches.length; i++) {
    let search = sampleSearches[i];
    if (search.length != args.length) {
      return [];
    }
    for (let j = 0; j < search.length; j++) {
      if (search[j] != args[j]) {
        return [];
      }
    }
    return search;
  }
  return [];
}

// stores search arguments --> search results
const mockSearchData: Map<string[], string[][]> = new Map();
// search with specifier
mockSearchData.set(pplAge, [
  ["catherine", "19", "blue"],
  ["sana", "19", "green"],
]);
mockSearchData.set(pplColor, [["sana", "19", "green"]]);
mockSearchData.set(testName, []);
mockSearchData.set(pplName, []);
mockSearchData.set(pplIndex, [["catherine", "19", "blue"]]); // by index
// search without col specifier
mockSearchData.set(ppl19, [
  ["catherine", "19", "blue"],
  ["sana", "19", "green"],
]);
mockSearchData.set(testA, [["a", "b", "c"]]);
mockSearchData.set(testZ, []);

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

export function mockSearchCSVNew(
  cmdMap: Map<string, REPLFunction>,
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: string[]
): string | string[][] {
  if (args.length == 2 || args.length == 4) {
    if (fileLoaded != args[0]) {
      return "Please load the file " + args[0] + " before searching!";
    }

    let real_args = samplesContain(args);
    if (real_args.length == 0) {
      return "Mock search data has not been implemented for those arguments!";
    } else {
      const results = mockSearchData.get(real_args);
      if (results == undefined) {
        return "no";
      } else {
        return results;
      }
    }
  } else {
    return (
      'Incorrect number of arguments! Please input either "search <filename> <term>"' +
      ' or "search <filename> <term> <colType> <colName>".'
    );
  }
}

// enter search <column> <value>, <column> is either and index or column name
export function mockSearchCSV(
  cmdMap: Map<string, REPLFunction>,
  setModeIsBrief: Dispatch<SetStateAction<boolean>>,
  args: string[]
): string | string[][] {
  if (args.length == 2) {
    if (fileLoaded != args[0]) {
      return "Please load the file " + args[0] + " before searching!";
    }

    if (args[0] == "people.csv" && args[1] == "19") {
      return [
        ["catherine", "19", "blue"],
        ["sana", "19", "green"],
      ];
    } else if (args[0] == "test.csv" && args[1] == "a") {
      return [["a", "b", "c"]];
    } else if (args[0] == "test.csv" && args[1] == "z") {
      return [];
    } else {
      return "Mock search not implemented for those arguments!";
    }
  } else if (args.length == 4) {
    if (fileLoaded != args[0]) {
      return "Please load the file " + args[0] + " before searching!";
    }

    if (
      args[0] == "people.csv" &&
      args[1] == "19" &&
      args[2] == "n" &&
      args[3] == "age"
    ) {
      return [
        ["catherine", "19", "blue"],
        ["sana", "19", "green"],
      ];
    } else if (
      args[0] == "people.csv" &&
      args[1] == "green" &&
      args[2] == "n" &&
      args[3] == "color"
    ) {
      return [["sana", "19", "green"]];
    } else if (
      args[0] == "test.csv" &&
      args[1] == "x" &&
      args[2] == "n" &&
      args[3] == "name"
    ) {
      return [];
    } else if (
      args[0] == "people.csv" &&
      args[1] == "green" &&
      args[2] == "n" &&
      args[3] == "name"
    ) {
      return [];
    } else if (
      args[0] == "people.csv" &&
      args[1] == "catherine" &&
      args[2] == "i" &&
      args[3] == "0"
    ) {
      return [["catherine", "19", "blue"]];
    } else {
      return "Mock search not implemented for those arguments!";
    }
  } else {
    return (
      'Incorrect number of arguments! Please input either "search <filename> <term>"' +
      ' or "search <filename> <term> <colType> <colName>".'
    );
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
