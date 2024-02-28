import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { mockLoadCSV, mode, mockSearchCSV, mockViewCSV } from "./REPLFunctions";
import { REPLFunction } from "./FunctionInterface";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;
// import {REPLProps} from "./PropsInterface";

interface REPLProps {
  // desired props... Maybe something to keep track of the submitted commands
  historyList: history[];
  setHistory: Dispatch<SetStateAction<history[]>>;
  modeIsBrief: boolean;
  setModeIsBrief: Dispatch<SetStateAction<boolean>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const cmdToFunc: Map<String, REPLFunction> = new Map();
  cmdToFunc.set("load", mockLoadCSV);
  cmdToFunc.set("view", mockViewCSV);
  cmdToFunc.set("search", mockSearchCSV);
  cmdToFunc.set("mode", mode);

  const handleSubmit = (commandString: string) => {
    const commandList = commandString.split(" ");
    let f = cmdToFunc.get(commandList[0]); // commandList[0] is the command

    if (f != undefined) {
      // command exists
      const response = f(props.setModeIsBrief, commandList.slice(1));
      props.setHistory([
        ...props.historyList,
        {
          command: commandList[0],
          isBrief: props.modeIsBrief,
          response: response,
        },
      ]);
    } else {
      // command does not exist
      props.setHistory([
        ...props.historyList,
        {
          command: commandList[0],
          isBrief: props.modeIsBrief,
          response: "Error: command does not exist",
        },
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
      {/* handleSubmit function increments count and displays the text in the button */}
      {/* this button just counts up and pushes the contents of the input box to the history*/}
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
