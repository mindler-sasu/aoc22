import { chunk, splitLines } from "./util";
import { readFileSync } from "fs";

const input = readFileSync("src/inpufz/i5.txt", "utf-8");
const [startingConfigurationAscii, commands] = input
  .split("\n\n")
  .map((lines: string) => splitLines(lines));

const startingConfigurationToStacks = (
  startingConfigurationAscii: string[]
) => {
  const conf = startingConfigurationAscii.slice(0, -1).reverse();
  return conf.reduce((stacks: string[][], row) => {
    const format = chunk([...row], 4).flatMap((a) => a.join("").trim());
    format.forEach((present, i) => {
      if (!present.trim()) {
        return stacks[i];
      }
      if (stacks[i]) {
        (stacks[i] ?? []).push(present);
        return stacks[i];
      }
      stacks.push([present]);
      return stacks[i];
    });
    return stacks;
  }, []);
};
const move = (stacks: string[][], from: number, to: number, chunk: number) => {
  const presents = stacks
    .at(from)
    ?.splice((stacks.at(from) ?? []).length - chunk);
  if (!presents) return;
  stacks[to] = stacks.at(to)?.concat(presents) ?? [];
};
const moveStacks = (
  stacks: string[][],
  commands: string[]
  // crane9001 = false
) => {
  const machineCommands = commands.map((command) =>
    command.replaceAll(/\D+/g, " ").replaceAll(/ {2,}/g, "")
  );
  machineCommands.forEach((command) => {
    const [countz, fromz, toz] = [...command.matchAll(/\d+/g)];
    if (!countz || !fromz || !toz) {
      return;
    }
    const count = Number(countz[0]);
    const from = Number(fromz[0]) - 1;
    const to = Number(toz[0]) - 1;
    move(stacks, from, to, count);
  });
  return stacks;
};

const stacks = startingConfigurationToStacks(
  startingConfigurationAscii ?? [""]
);

if (!commands) {
  throw new Error();
}
const finalStacks = moveStacks(stacks, commands);
const getResultFromStack = (stacks: string[][]) =>
  stacks
    .map((stack) => stack.pop() ?? "")
    .map(([_, x]) => x)
    .join("");

console.log(getResultFromStack(finalStacks));
