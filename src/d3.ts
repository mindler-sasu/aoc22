import { map, match } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { getFileContents, splitLines, sum } from "./util";
// 7826
// 2577
const splitInMiddle = (arr: string[]) =>
  arr.map((str) => [
    str.slice(0, str.length / 2),
    str.slice(str.length / 2, str.length),
  ]);

const mapPriority = (arr: string[]): number[] =>
  arr.map((str) =>
    str.charCodeAt(0) < 91 ? str.charCodeAt(0) - 38 : str.charCodeAt(0) - 96
  );
const reduceUniquesOfN = (arrs: string[][]) =>
  arrs.map((arrN: string[]) =>
    [...arrN.join()].filter((char) =>
      arrN.every((arr) => [...arr].includes(char))
    )
  );

const flatMapUnique = (arrs: string[][]) =>
  arrs.flatMap((arr: string[]) => [...new Set(arr)]);

pipe(
  "src/inpufz/i3.txt",
  getFileContents,
  map(splitLines),
  map(splitInMiddle),
  map(reduceUniquesOfN),
  map(flatMapUnique),
  map(mapPriority),
  map(sum),
  match(console.error, console.log)
);

const chunk = (arr: string[], size: number): string[][] =>
  arr.length > size
    ? [arr.slice(0, size), ...chunk(arr.slice(size), size)]
    : [arr];

pipe(
  "src/inpufz/i3.txt",
  getFileContents,
  map(splitLines),
  map((z) => [...chunk(z, 3)]),
  map(reduceUniquesOfN),
  map(flatMapUnique),
  map(mapPriority),
  map(sum),
  match(console.error, console.log)
);
