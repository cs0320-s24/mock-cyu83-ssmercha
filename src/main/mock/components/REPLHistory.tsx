import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  historyList: history[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}

      {/* only put command if not brief (ie verbose) */}
      {props.historyList.map((hEntry) =>
        hEntry.isBrief ? (
          <div>{hEntry.command}</div>
        ) : (
          <div>
            <p>Command: {hEntry.command}</p>
            <p>Ouput:</p>
            {typeof hEntry.response ===
            "string" /* display response as correct type (string/table) */ ? (
              <div>{hEntry.response}</div>
            ) : (
              <table>
                {hEntry.response.map((row) => [
                  <tr>{row.map((elt) => [<td>{elt}</td>])}</tr>,
                ])}
              </table>
            )}
          </div>
        )
      )}
    </div>
  );
}
