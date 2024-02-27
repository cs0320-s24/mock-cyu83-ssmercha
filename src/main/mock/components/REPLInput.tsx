import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { loadCSV, mode, REPLFunction, search, view } from "./REPLFunction";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: history;
  setHistoryInput: Dispatch<SetStateAction<history["commandInput"]>>; //this will keep track of every thing in the order that you enter
  setHistoryOutput: Dispatch<SetStateAction<history["functionOutput"]>>;

  //   args: string[];
  //   setArgs: Dispatch<SetStateAction<string[]>>;
  //   command: string;
  //   setCommand: Dispatch<SetStateAction<string>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  //   const [result, setResult] = useState<string[][]>([]);
  //   const [args, setArgs] = useState<string[]>([]);
  //   const [command, setCommand] = useState<string>("");

  let l: REPLFunction = loadCSV;
  let v: REPLFunction = view;
  let s: REPLFunction = search;
  let m: REPLFunction = mode;

  const functions: Map<String, REPLFunction> = new Map();

  functions.set("load", l);
  functions.set("view", v);
  functions.set("search", s);
  functions.set("search", m);

  const handleSubmit = (commandString: string) => {
    setCount(count + 1);
    // props.setHistory([...props.history, commandString]);
    const commandList = commandString.split(" ");
    // const argsList = commandList.slice(1);
    // setArgs(argsList);
    // const cmd = commandList[0];
    // setCommand(cmd);
    // props.setHistory([...props.history, command]);
    let f = functions.get(commandList[0]);
    if (f != undefined) {
      const output = f(commandList.slice(1));
      if (typeof output === "string") {
        props.setHistoryInput([
          ...props.history.commandInput,
          "" + commandString,
        ]);
      } else {
        // props.setHistory([...props.history, "" + output]);
        props.setHistoryOutput([...props.history.functionOutput, "" + output]);
      }
      //   props.setHistory([...props.history, "" + result]);
    } else {
      props.setHistoryInput([
        ...props.history.commandInput,
        "" + "Error: must enter a valid command",
      ]);
    }
    setCommandString("");
  };

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button
        onClick={() => {
          handleSubmit(commandString);
        }}
      >
        Submitted {count} times
      </button>
    </div>
  );
}
