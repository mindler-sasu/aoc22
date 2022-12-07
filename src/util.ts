import { tryCatch, toError } from "fp-ts/lib/Either";

import { readFileSync } from "fs";

export const getFileContents = (path: string) =>
  tryCatch(() => readFileSync(path, "utf-8"), toError);

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b);

export const splitLines = (str: string) => str.split("\n");

export const peek = <T>(z: T): T => {
  console.log(z);
  return z;
};

export const chunk = (arr: string[], size: number): string[][] =>
  arr.length > size
    ? [arr.slice(0, size), ...chunk(arr.slice(size), size)]
    : [arr];
