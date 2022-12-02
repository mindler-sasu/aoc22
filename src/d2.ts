import { match, map } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { getFileContents, sum } from "./util";

const getPositionForMyChoice = (choice: string) => choice.charCodeAt(0) - 88;
const getPositionForOppChoice = (choice: string) => choice.charCodeAt(0) - 65;
const acualMod = (x: number, m: number) => ((x % m) + m) % m;
const getResultForRound = (expected: string, answer: string) => {
  if (expected === answer) return 0;
  return acualMod(
    getPositionForMyChoice(answer) - getPositionForOppChoice(expected),
    3
  );
};

const pointsForResult = (result: number) => {
  if (result === 0) return 3;
  return result === 1 ? 6 : 0;
};

const splitRounds = (str: string) => str.split("\n");

const calculatePoints = (rounds: string[]) =>
  rounds.map(([expected, _, answer]: string) => {
    if (!expected || !answer) {
      return 0;
    }

    return (
      pointsForResult(getResultForRound(expected, answer)) +
      getPositionForMyChoice(answer) +
      1
    );
  });

pipe(
  "src/inpufz/i2.txt",
  getFileContents,
  map(splitRounds),
  map(calculatePoints),
  map(sum),
  match(console.error, console.log)
);
