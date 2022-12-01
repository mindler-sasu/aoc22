import { promisify } from "util";
import fs from "fs";
import {
  tryCatch,
  match,
  map
} from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

const readFromFile = promisify(fs.readFile);

export const getFileContents = (path: string) =>
  tryCatch(() => readFromFile(path, "utf-8"), toError);

export const splitLines = (str: string) => str.split("\n")

const sum = (arr: number[]) => arr.reduce((a, b) => a + b)

const chunkSums = (arr: string[]) => 
  arr.reduce((chunk: number[], curr) => {
      if (curr) {
        const lastSum = chunk.slice(-1)[0];
        return [
          ...chunk.slice(0, chunk.length - 1),
          lastSum ? lastSum + Number(curr) : Number(curr),
        ];
      }
      return [...chunk, Number(curr)];
    }, []);

const maxThree = (arr: number[]) => arr.sort((a, b) => a - b).slice(-3)

pipe(
  "src/input.txt",
  getFileContents,
  map(splitLines),
  map(chunkSums),
  map(maxThree),
  map(sum),
  match(console.error, console.log)
)()
