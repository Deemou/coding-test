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
  const [N, K] = input().split(" ").map(Number);
  const temps = input().split(" ").map(Number);
  let maxSum = temps.slice(0, K).reduce((acc, cur) => acc + cur, 0);
  let sum = maxSum;

  for (let i = K; i < N; i++) {
    sum += temps[i] - temps[i - K];
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum;
}
