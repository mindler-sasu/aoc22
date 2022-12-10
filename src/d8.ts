import { readFileSync } from "fs";
const matrix = readFileSync("src/inpufz/i8.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

// 3 0 3 7 3
// 2 5 5 1 2
// 6 5 3 3 2
// 3 3 5 4 9
// 3 5 3 9 0

// The top-left 5 is visible from the left and top. (It isn't visible from the right or bottom since other trees of height 5 are in the way.)
// The top-middle 5 is visible from the top and right.
// The top-right 1 is not visible from any direction; for it to be visible, there would need to only be trees of height 0 between it and an edge.
// The left-middle 5 is visible, but only from the right.
// The center 3 is not visible from any direction; for it to be visible, there would need to be only trees of at most height 2 between it and an edge.
// The right-middle 3 is visible from the right.
// In the bottom row, the middle 5 is visible, but the 3 and 4 are not.

const generateVisibilityMap = (
  matrix:
    | (string[] | boolean[])[]
    | string[][]
    | boolean[][]
    | (string | boolean)[][]
) => {
  return matrix.map((row, iz) => {
    let highestTree = 0;
    return row.map((tree, i) => {
      const isHigher = Number(tree) > highestTree;

      if (isHigher) {
        highestTree = Number(tree);
      }

      if (
        iz === 0 ||
        iz === matrix.length - 1 ||
        i === 0 ||
        i === row.length - 1
      ) {
        return true;
      }

      if (isHigher) {
        return true;
      }
      return false;
    });
  });
};

const transpose = (matrixz: (string[] | boolean[])[]) =>
  matrixz.reduce(
    (prev: (string | boolean)[][], next) =>
      next.map((_, i) => (prev[i] || []).concat(next[i] ?? [])),
    []
  );

const reverseRows = (
  matrixz: (string[] | boolean[])[] | (string | boolean)[][]
) => {
  const m = matrixz.map((a) => a.slice());
  return m.map((row) => row.reverse());
};

const visibilityFromLeft = generateVisibilityMap(matrix);
const visibilityFromRight = reverseRows(
  generateVisibilityMap(reverseRows(matrix))
);
const visibilityFromTop = transpose(generateVisibilityMap(transpose(matrix)));
const visibilityFromBottom = transpose(
  //@ts-ignore
  reverseRows(generateVisibilityMap(reverseRows(transpose(matrix))))
);

console.log("-------L");
console.log(visibilityFromLeft);
console.log("-------R");
console.log(visibilityFromRight);
console.log("-------T");
console.log(visibilityFromTop);
console.log("-------B");
console.log(visibilityFromBottom);

const acualVisibilityMap = [
  visibilityFromBottom,
  visibilityFromLeft,
  visibilityFromRight,
  visibilityFromTop,
].reduce((result, currMap) => {
  //@ts-ignore
  return currMap.map((row, j) => row.map((tree, i) => result[j][i] || tree));
});
console.log("-------M");
console.log(acualVisibilityMap);
console.log(acualVisibilityMap.length, acualVisibilityMap[0]?.length);
console.log(acualVisibilityMap.flat().filter(Boolean).length);
