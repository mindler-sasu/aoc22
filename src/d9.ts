import { readFileSync } from "fs";
const commands = readFileSync("src/inpufz/i9.txt", "utf-8").split("\n");

class Point {
  x = 0;
  y = 0;
  trail: number[][] = [[0, 0]];

  location(): [number, number] {
    return [this.x, this.y];
  }
  move(direction: string | undefined, count: number) {
    switch (direction) {
      case "D": {
        this.y -= count;
        break;
      }
      case "U": {
        this.y += count;
        break;
      }
      case "R": {
        this.x += count;
        break;
      }
      case "L": {
        this.x -= count;
        break;
      }
      default: {
        throw new Error("paskat vittuun");
      }
    }
    this.trail.push([this.x, this.y]);
  }

  chebyshev(target: [number, number]) {
    return Math.max(Math.abs(this.x - target[0]), Math.abs(this.y - target[1]));
  }

  follow(target: number[]) {
    const targetX = target[0] ?? 0;
    const targetY = target[1] ?? 0;

    const direction: [number, number] = [targetX - this.x, targetY - this.y];
    const unitX =
      direction[0] !== 0 ? direction[0] / Math.abs(direction[0]) : direction[0];
    const unitY =
      direction[1] !== 0 ? direction[1] / Math.abs(direction[1]) : direction[1];

    this.x += unitX;
    this.y += unitY;

    this.trail.push([this.x, this.y]);
  }
}

const head = new Point();
const points: Point[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_) => new Point());

for (const command of commands) {
  const [direction, countz] = command.split(" ");
  const count = Number(countz);

  for (let i = 0; i < count; i++) {
    head.move(direction, 1);
    let lastPoint = head.location();
    for (const tail of points) {
      if (tail.chebyshev(lastPoint) > 1) {
        tail.follow(lastPoint);
      }
      lastPoint = tail.location();
    }
  }
}

const PASKETSETIT = new Set(
  (points.at(-1) as any).trail.map((pair: any[]) =>
    pair.map((z) => `${z}`).join(",")
  )
).size;

console.log("solution", PASKETSETIT);
