import { Dispatch, SetStateAction, useState } from "react";

export interface REPLFunction {
  (
    cmdMap: Map<string, REPLFunction>,
    setModeIsBrief: Dispatch<SetStateAction<boolean>>,
    args: string[]
  ): string | string[][];
}
