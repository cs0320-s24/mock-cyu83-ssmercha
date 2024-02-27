import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  h: history;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.h.commandInput.map((command) => [<p>{command}</p>])}
      <table>{props.h.functionOutput.map((row) => [<tr>{row}</tr>])}</table>
    </div>
  );
}
