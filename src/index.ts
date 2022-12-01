import { promisify } from "util";
import fs from "fs";
import {
  tryCatch as TaskEitherTryCatch,
  chain,
  fromIOEither,
} from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";
import { tryCatch } from "fp-ts/lib/IOEither";

const readFromFile = promisify(fs.readFile);

export const getFileContents = (path: string) =>
  TaskEitherTryCatch(() => readFromFile(path, "utf-8"), toError);

export const splitLines = (str: string) =>
  tryCatch(() => str.split("\n"), toError);

const sum = (arr: number[]) =>
  tryCatch(() => arr.reduce((a, b) => a + b), toError);

const chunkSums = (arr: string[]) =>
  tryCatch(() => {
    return arr.reduce((chunk: number[], curr) => {
      if (curr) {
        const lastSum = chunk.slice(-1)[0];
        return [
          ...chunk.slice(0, chunk.length - 1),
          lastSum ? lastSum + Number(curr) : Number(curr),
        ];
      }
      return [...chunk, Number(curr)];
    }, []);
  }, toError);

const maxThree = (arr: number[]) =>
  tryCatch(() => arr.sort((a, b) => a - b).slice(-3), toError);

flow(
  getFileContents,
  chain((str) => fromIOEither(splitLines(str))),
  chain((arr) => fromIOEither(chunkSums(arr))),
  chain((arr) => fromIOEither(maxThree(arr))),
  chain((arr) => fromIOEither(sum(arr)))
)("src/input.txt")().then((either) => fold(console.error, console.log)(either));
