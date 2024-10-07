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
  const inputs = Array.from({ length: n }, () => Number(input()));
  const wines = [0].concat(inputs);
  const dp = [0, wines[1], wines[1] + wines[2]];
  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      dp[i - 2] + wines[i],
      dp[i - 3] + wines[i] + wines[i - 1]
    );
  }

  return dp[n];
}
