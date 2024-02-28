import { Dispatch, SetStateAction, useState } from "react";

export interface REPLFunction {
  (setModeIsBrief: Dispatch<SetStateAction<boolean>>, args: string[]):
    | string
    | string[][];
}
