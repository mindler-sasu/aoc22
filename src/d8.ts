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
function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean
): number {
  let l = array.length;
  while (l--) {
    //@ts-ignore
    if (predicate(array[l], l, array)) return l;
  }
  return -1;
}
const generateVisibilityMap = (
  matrix:
    | (string[] | boolean[])[]
    | string[][]
    | boolean[][]
    | (string | boolean)[][]
    | (string | boolean | number)[][]
) => {
  return matrix.map((row) => {
    let highestTree = 0;
    return row.map((tree, i) => {
      const isHigher = Number(tree) > highestTree;

      if (isHigher) {
        highestTree = Number(tree);
      }
      const viewBlockedAt = findLastIndex(row.slice(0, i), (p) => p >= tree);

      const distToBlock =
        viewBlockedAt !== -1
          ? row.slice(viewBlockedAt, i).length
          : row.slice(0, i).length;

      // console.log({
      //   tree,
      //   i,
      //   viewBlockedAt,
      //   distToBlock,
      //   a: row.slice(0, i).length,
      //   b: viewBlockedAt === -1,
      // });
      return distToBlock;
    });
  });
};

const transpose = (matrixz: (string[] | boolean[] | number[])[]) =>
  matrixz.reduce(
    (prev: (string | boolean | number)[][], next) =>
      next.map((_, i) => (prev[i] || []).concat(next[i] ?? [])),
    []
  );

const reverseRows = (
  matrixz: (string[] | boolean[] | number[])[] | (string | boolean | number)[][]
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

// console.log("-------L");
// console.log(visibilityFromLeft);
// console.log("-------R");
// console.log(visibilityFromRight);
// console.log("-------T");
// console.log(visibilityFromTop);
// console.log("-------B");
// console.log(visibilityFromBottom);

const acualVisibilityMap = [
  visibilityFromBottom,
  visibilityFromLeft,
  visibilityFromRight,
  visibilityFromTop,
].reduce((result, currMap) => {
  //@ts-ignore
  return currMap.map((row, j) => row.map((tree, i) => result[j][i] * tree));
});
console.log("-------M");
// console.log(acualVisibilityMap);
//@ts-ignore
console.log(Math.max(...acualVisibilityMap.flat()));
