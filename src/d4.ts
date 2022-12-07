import { splitLines } from "./util";
import { readFileSync } from "fs";
// .2345678.  2-8
// ..34567..  3-7
const input = readFileSync("src/inpufz/i4.txt", "utf-8");
const lines = splitLines(input);
const shifts = lines.map((line) => line.split(","));

const getRange = (from: number, to: number) => {
  return Number(to) - Number(from);
};

const getTimes = (str: string) => {
  const split = str.split("-");
  return [Number(split[0]), Number(split[1])];
};
const overlaps = shifts.map(([a, b]) => {
  if (!(a && b)) {
    return false;
  }
  const [fromA, toA] = getTimes(a);
  const [fromB, toB] = getTimes(b);
  if (!(fromA && fromB && toA && toB)) {
    return false;
  }
  const aRange = getRange(fromA, toA);
  const bRange = getRange(fromB, toB);
  if (aRange >= bRange) {
    if (fromB >= fromA && toB <= toA) {
      return true;
    }
  } else if (fromA >= fromB && toA <= toB) {
    return true;
  }
  return false;
});

// const hasUnique = (numbers: number[]) => {
//   return [...new Set(numbers)].length !== numbers.length;
// };
const overlapsAtAll = shifts.map(([a, b]) => {
  if (!(a && b)) {
    return false;
  }
  const [fromA, toA] = getTimes(a);
  const [fromB, toB] = getTimes(b);
  if (!(fromA && fromB && toA && toB)) {
    return false;
  }
  // const aRange = getRange(fromA, toA);
  // const bRange = getRange(fromB, toB);
  // 2-3,4-5
  // 4-5,1-2
  // const overlapDigit = hasUnique([fromA, fromB, toA, toB]);
  // if (overlapDigit) {
  //   return true;
  // }

  if (toA < fromB) {
    return false;
  }
  if (toB < fromA) {
    return false;
  }

  return true;
});
console.log(overlaps.filter(Boolean).length);
console.log(overlapsAtAll.filter(Boolean).length);
