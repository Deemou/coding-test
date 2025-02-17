const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const readline = require("readline");
let line = 0;
const lines = [];
const input = () => lines[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    lines.push(line);
  }).on("close", () => {
    console.log(solution());
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const TOTAL_STRINGS = 6;
  const [n, p] = input().split(" ").map(Number);
  const stacks = Array.from({ length: TOTAL_STRINGS + 1 }, () => []);
  let fingerMoves = 0;

  for (let i = 0; i < n; i++) {
    const [string, fret] = input().split(" ").map(Number);
    const stack = stacks[string];

    if (!stack.length) {
      stack.push(fret);
      fingerMoves++;
    } else {
      while (stack.at(-1) > fret) {
        stack.pop();
        fingerMoves++;
      }
      if (stack.at(-1) !== fret) {
        stack.push(fret);
        fingerMoves++;
      }
    }
  }

  return fingerMoves;
}
