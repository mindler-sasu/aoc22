import { readFileSync } from "fs";
console.log(
  readFileSync("src/inpufz/i6.txt", "utf-8")
    .split("")
    .findIndex(
      (_: string, i, input) => new Set(input.slice(i, i + 14)).size === 14
    ) + 14
);
