const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./example.txt";
const readline = require("readline");
let line = 0;
let stdin = [];
const input = () => stdin[line++];

function readFile(filePath) {
  const readStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: readStream,
  });

  rl.on("line", (line) => {
    stdin.push(line);
  }).on("close", () => {
    solution();
    process.exit();
  });
}

readFile(filePath);

function solution() {
  const n = +input();
  const distances = input().split(" ").map(Number);
  const prices = input().split(" ").map(Number);

  let min = prices[0];
  let sum = 0;

  for (let i = 0; i < n - 1; i++) {
    min = Math.min(min, prices[i]);
    sum += min * distances[i];
  }

  console.log(sum);
}
