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
  const n = Number(input());
  const boxes = input().split(" ").map(Number);
  const MAX_SIZE = 1000;
  const dp = Array(MAX_SIZE + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const size = boxes[i];
    dp[size] = Math.max(...dp.slice(1, size), 0) + 1;
  }
  return Math.max(...dp);
}
