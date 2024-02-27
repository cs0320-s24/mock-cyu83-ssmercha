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
  ["sana", "19?", "green?"],
]);

export function mockViewCSV(args: Array<string>): string | string[][] {
  let data = mockFileData.get(args[0]);
  if (data != undefined) {
    return data;
  } else {
    return "File does not exist!";
  }
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
