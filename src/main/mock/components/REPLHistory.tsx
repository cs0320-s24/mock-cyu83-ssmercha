import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  historyList: history[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}

      {/* only put command if not brief (ie verbose)
       TODO: figure out the syntax for doing this */}
      {props.historyList.map((hEntry) =>
        hEntry.isBrief ? (
          <div>{hEntry.command}</div>
        ) : (
          <div>
            <p>Command: {hEntry.command}</p>
            <p>Ouput:</p>
            {hEntry.response}
          </div>
        )
      )}
      {/* {props.historyList.map((command, index) => [<p>{command.command}</p>])} */}

      {/* TODO: figure out how to put response in as well, depending on type string or string[][] */}
      {/* <p>Output: </p>
      <table>
        {props.historyList.map((hEntry, index) => {
          if (typeof hEntry.response === "string") {
            [<p>{hEntry.response}</p>];
          } else {
            // TODO: parse into HTML table
          }
        })}
        // {
        
          // { if (typeof hEntry.response === "string") {
          //   [<p>{hEntry.response}</p>];
          // } else {
            
          // }
        // }
       
      </table> */}

      {/* old */}
      {/* <table>{props.historyList.functionOutput.map((row) => [<tr>{row}</tr>])}</table> */}
    </div>
  );
}
